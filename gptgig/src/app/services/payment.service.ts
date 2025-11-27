import { Injectable } from '@angular/core';
import { loadStripe, Stripe, PaymentRequest } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripePromise = loadStripe(environment.stripePublishableKey);

  constructor(private http: HttpClient) {}

  getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }

  async createPaymentRequest(amount: number, currency: string): Promise<PaymentRequest | null> {
    const stripe = await this.getStripe();
    if (!stripe) {
      return null;
    }
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency,
      total: {
        label: 'Total',
        amount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });
    const result = await paymentRequest.canMakePayment();
    return result ? paymentRequest : null;
  }

  createPaymentIntent(amount: number, currency: string): Observable<PaymentIntentResponse> {
    return this.http.post<PaymentIntentResponse>(`${environment.apiUrl}/payments/create-intent`, { amount, currency });
  }
}
