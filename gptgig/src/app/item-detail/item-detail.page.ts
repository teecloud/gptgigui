import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { CartService } from '../services/cart.service';
import { ServiceItem } from '../models/catalog.models';
import { SchedulerService } from '../services/scheduler.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss']
})
export class ItemDetailPage implements OnInit {
  item?: ServiceItem;
  slots: string[] = [];
  selectedSlot?: string;

  private route = inject(ActivatedRoute);
  private catalog = inject(CatalogService);
  private cart = inject(CartService);
  private router = inject(Router);
  private scheduler = inject(SchedulerService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const items = this.catalog.services$.value;
      this.item = items.find((s) => s.id === id);
      if (this.item) {
        this.slots = this.item.availableSlots ?? this.scheduler.generateSlots();
        this.selectedSlot = this.slots[0];
      }
    }
  }

  addToCart() {
    if (this.item) {
      const item = { ...this.item, selectedSlot: this.selectedSlot };
      this.cart.selectItem(item);
      this.router.navigate(['/cart']);
    }
  }
}

