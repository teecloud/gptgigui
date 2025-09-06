import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, AsyncPipe } from '@angular/common';
import { OffersCarouselComponent } from '../../../components/offers-carousel/offers-carousel.component';
import { CatalogService } from '../../../services/catalog.service';
import { OrderService } from '../../../services/order.service';
import { map } from 'rxjs/operators';
import { PageToolbarComponent } from 'src/app/components/page-toolbar/page-toolbar.component';

import { OrderQueueComponent } from '../../../components/order-queue/order-queue.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    IonicModule,
    CommonModule,
    AsyncPipe,
    OffersCarouselComponent,
    PageToolbarComponent,
    OrderQueueComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  private catalog = inject(CatalogService);
  private orders = inject(OrderService);

  services$  = this.catalog.services$;
  providers$ = this.catalog.providers$;

  topPicks$ = this.services$.pipe(map(list => list.slice(0, 10)));
  trending$ = this.services$.pipe(map(list => [...list].reverse()));
  topProviders$ = this.providers$.pipe(map(list => list.slice(0, 10)));
  orders$ = this.orders.getVendorQueue();
}
