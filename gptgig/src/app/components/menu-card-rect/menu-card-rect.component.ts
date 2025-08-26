import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceItem } from '../../models/catalog.models';

@Component({
  standalone: true,
  selector: 'app-menu-card-rect',
  imports: [IonicModule, CommonModule, CurrencyPipe],
  templateUrl: './menu-card-rect.component.html',
  styleUrls: ['./menu-card-rect.component.scss']
})
export class MenuCardRectComponent {
  @Input() item!: ServiceItem;

  constructor(private router: Router) {}

  select() {
    this.router.navigate(['/item', this.item.id]);
  }
}
