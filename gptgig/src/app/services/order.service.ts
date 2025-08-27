import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [
    {
      id: '1',
      title: 'Coffee Beans 1kg',
      customer: 'Alice',
      status: 'pending',
      imageUrl: 'assets/placeholder-rect.jpg',
    },
    {
      id: '2',
      title: 'Espresso Machine',
      customer: 'Bob',
      status: 'pending',
      imageUrl: 'assets/placeholder-rect.jpg',
    },
    {
      id: '3',
      title: 'Grinder',
      customer: 'Carol',
      status: 'pending',
      imageUrl: 'assets/placeholder-rect.jpg',
    },
  ];

  getVendorQueue(): Observable<Order[]> {
    return of(this.orders);
  }
}
