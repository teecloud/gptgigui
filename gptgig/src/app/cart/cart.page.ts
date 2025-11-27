import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { PaymentButtonComponent } from '../components/payment-button/payment-button.component';
import { PageToolbarComponent } from '../components/page-toolbar/page-toolbar.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    CurrencyPipe,
    PaymentButtonComponent,
    PageToolbarComponent,
  ],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  constructor(public cart: CartService, private toast: ToastService) {}

  async onPaymentComplete() {
    this.cart.clear();
    await this.toast.show('Your order is confirmed!');
  }

  async onPaymentFailed(message: string) {
    await this.toast.show(message);
  }
}
