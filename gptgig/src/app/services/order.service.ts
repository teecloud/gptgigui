import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';

export interface CreateOrderRequest {
  serviceItemId: string;
  serviceTitle: string;
  serviceImageUrl?: string;
  amount: number;
  currency: string;
  paymentIntentId: string;
  paymentMethodType?: string;
  paymentStatus?: string;
  customerName?: string;
  customerEmail?: string;
  scheduledSlot?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/orders`;

  createOrder(payload: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, payload);
  }

  getVendorQueue(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl).pipe(
      map(orders => orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    );
  }
}
