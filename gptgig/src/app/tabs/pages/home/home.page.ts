import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, AsyncPipe } from '@angular/common';
import { OffersCarouselComponent } from '../../../components/offers-carousel/offers-carousel.component';
import { CatalogService } from '../../../services/catalog.service';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [IonicModule, CommonModule, AsyncPipe, OffersCarouselComponent, RouterLink],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  private catalog = inject(CatalogService);

  services$  = this.catalog.services$;
  providers$ = this.catalog.providers$;

  topPicks$ = this.services$.pipe(map(list => list.slice(0, 10)));
  trending$ = this.services$.pipe(map(list => [...list].reverse()));
  topProviders$ = this.providers$.pipe(map(list => list.slice(0, 10)));
}
