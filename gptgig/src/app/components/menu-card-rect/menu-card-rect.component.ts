import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceItem } from '../../models/catalog.models';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-menu-card-rect',
  imports: [IonicModule, CommonModule, CurrencyPipe],
  templateUrl: './menu-card-rect.component.html',
  styleUrls: ['./menu-card-rect.component.scss']
})
export class MenuCardRectComponent {
  @Input() item!: ServiceItem;

  constructor(private cart: CartService, private router: Router) {}

  select() {
    this.cart.selectItem(this.item);
    this.router.navigate(['/cart']);
  }
}
