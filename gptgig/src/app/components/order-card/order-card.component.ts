import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';

@Component({
  standalone: true,
  selector: 'app-order-card',
  imports: [IonicModule, CommonModule],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Input() order!: Order;
}
