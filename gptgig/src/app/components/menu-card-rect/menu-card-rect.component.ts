import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceItem } from '../../models/catalog.models';
import { CatalogService } from '../../services/catalog.service';

@Component({
  standalone: true,
  selector: 'app-menu-card-rect',
  imports: [IonicModule, CommonModule, CurrencyPipe],
  templateUrl: './menu-card-rect.component.html',
  styleUrls: ['./menu-card-rect.component.scss']
})
export class MenuCardRectComponent {
  @Input() item!: ServiceItem;

  constructor(private router: Router, private catalog: CatalogService) {}

  select() {
    this.router.navigate(['/item', this.item.id]);
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    this.catalog.toggleWishlist(this.item.id);
  }
}
