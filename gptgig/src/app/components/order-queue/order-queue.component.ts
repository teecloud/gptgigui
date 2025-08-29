import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';

@Component({
  standalone: true,
  selector: 'app-order-queue',
  imports: [IonicModule, CommonModule],
  templateUrl: './order-queue.component.html',
  styleUrls: ['./order-queue.component.scss']
})
export class OrderQueueComponent {
  @Input() orders: Order[] | null = null;

  getItemColor(order: Order): string {
    const now = new Date();
    const scheduled = new Date(order.scheduledTime);
    const diff = scheduled.getTime() - now.getTime();

    if (diff < 0) {
      return 'danger';
    }
    if (diff < 60 * 60 * 1000) {
      return 'warning';
    }
    return 'success';
  }
}
