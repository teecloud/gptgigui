import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentRequestPaymentMethodEvent, Stripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { ServiceItem } from '../../models/catalog.models';
import { CreateOrderRequest, OrderService } from '../../services/order.service';
import { PaymentIntentResponse, PaymentService } from '../../services/payment.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaymentButtonComponent implements OnInit {
  @Input() amount = 0;
  @Input() currency = 'usd';
  @Input() item?: ServiceItem;
  @Input() scheduledSlot?: string;

  @Output() transactionCompleted = new EventEmitter<void>();
  @Output() transactionFailed = new EventEmitter<string>();

  isReady = false;
  isProcessing = false;
  private amountCents = 0;

  constructor(
    private el: ElementRef,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    this.amountCents = Math.max(0, Math.round(this.amount));

    const stripe = await this.paymentService.getStripe();
    if (!stripe) {
      this.displayUnavailable();
      return;
    }

    const paymentRequest = await this.paymentService.createPaymentRequest(this.amountCents, this.currency);
    if (!paymentRequest) {
      this.displayUnavailable();
      return;
    }

    const prButton = stripe.elements().create('paymentRequestButton', {
      paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'buy',
          theme: 'dark',
          height: '48px',
        },
      },
    });

    prButton.mount(this.el.nativeElement.querySelector('#payment-request-button'));
    this.isReady = true;

    paymentRequest.on('paymentmethod', async (ev: PaymentRequestPaymentMethodEvent) => {
      if (this.isProcessing) {
        ev.complete('fail');
        return;
      }
      await this.handlePayment(stripe, ev);
    });
  }

  private displayUnavailable() {
    this.el.nativeElement.classList.add('payment-unavailable');
  }

  private async handlePayment(stripe: Stripe, ev: PaymentRequestPaymentMethodEvent) {
    this.isProcessing = true;
    try {
      const intent = await firstValueFrom(this.paymentService.createPaymentIntent(this.amountCents, this.currency));
      await this.confirmAndRecord(stripe, ev, intent);
    } catch (err) {
      ev.complete('fail');
      this.transactionFailed.emit('Unable to start payment.');
      await this.toast.show('Unable to start payment.');
    } finally {
      this.isProcessing = false;
    }
  }

  private async confirmAndRecord(stripe: Stripe, ev: PaymentRequestPaymentMethodEvent, intent: PaymentIntentResponse) {
    const { clientSecret, paymentIntentId } = intent;
    if (!clientSecret) {
      ev.complete('fail');
      this.transactionFailed.emit('Payment could not be initialized.');
      return;
    }

    const result = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: ev.paymentMethod.id,
      },
      { handleActions: true }
    );

    if (result.error || result.paymentIntent?.status !== 'succeeded') {
      ev.complete('fail');
      const message = result.error?.message || 'Payment failed.';
      this.transactionFailed.emit(message);
      await this.toast.show(message);
      return;
    }

    ev.complete('success');

    await this.recordOrder(paymentIntentId || result.paymentIntent?.id || '', ev);
    await this.toast.show('Payment completed successfully.');
    this.transactionCompleted.emit();
  }

  private async recordOrder(paymentIntentId: string, ev: PaymentRequestPaymentMethodEvent) {
    const intentId = paymentIntentId || ev.paymentMethod.id;
    if (!this.item || !intentId) {
      return;
    }

    const payload: CreateOrderRequest = {
      serviceItemId: this.item.id,
      serviceTitle: this.item.title,
      serviceImageUrl: this.item.imageUrl,
      amount: this.amountCents / 100,
      currency: this.currency,
      paymentIntentId: intentId,
      paymentMethodType: ev.paymentMethod.type,
      paymentStatus: 'succeeded',
      customerName: ev.payerName ?? undefined,
      customerEmail: ev.payerEmail ?? undefined,
      scheduledSlot: this.scheduledSlot ?? this.item.selectedSlot,
    };

    await firstValueFrom(this.orderService.createOrder(payload));
  }
}
