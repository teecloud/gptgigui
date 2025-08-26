import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { CartService } from '../services/cart.service';
import { ServiceItem } from '../models/catalog.models';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, CurrencyPipe],
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss']
})
export class ItemDetailPage implements OnInit {
  item?: ServiceItem;

  private route = inject(ActivatedRoute);
  private catalog = inject(CatalogService);
  private cart = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const items = this.catalog.services$.value;
      this.item = items.find((s) => s.id === id);
    }
  }

  addToCart() {
    if (this.item) {
      this.cart.selectItem(this.item);
      this.router.navigate(['/cart']);
    }
  }
}

