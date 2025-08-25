import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.scss'],
  standalone: true,
})
export class PaymentButtonComponent implements OnInit {
  @Input() amount = 0;
  @Input() currency = 'usd';

  constructor(private el: ElementRef, private paymentService: PaymentService) {}

  async ngOnInit() {
    const stripe = await this.paymentService.getStripe();
    if (!stripe) {
      this.el.nativeElement.style.display = 'none';
      return;
    }
    const paymentRequest = await this.paymentService.createPaymentRequest(this.amount, this.currency);
    if (!paymentRequest) {
      this.el.nativeElement.style.display = 'none';
      return;
    }
    const elements = stripe.elements();
    const prButton = elements.create('paymentRequestButton', {
      paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'default',
          theme: 'dark',
          height: '40px',
        },
      },
    });
    prButton.mount(this.el.nativeElement.querySelector('#payment-request-button'));

    paymentRequest.on('paymentmethod', async (ev) => {
      const intent = await this.paymentService.createPaymentIntent(this.amount, this.currency).toPromise();
      const clientSecret = intent?.clientSecret;
      if (!clientSecret) {
        ev.complete('fail');
        return;
      }
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: ev.paymentMethod.id,
      }, {
        handleActions: true,
      });
      if (error) {
        ev.complete('fail');
      } else {
        ev.complete('success');
      }
    });
  }
}
