import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MenuCardRectComponent } from '../menu-card-rect/menu-card-rect.component';
import { MenuCardCircComponent } from '../menu-card-circ/menu-card-circ.component';
import { ServiceItem, Provider } from '../../models/catalog.models';
import { OffersFeedModalComponent } from '../offers-feed-modal/offers-feed-modal.component';

type CardType = 'rect' | 'circ';

@Component({
  standalone: true,
  selector: 'app-offers-carousel',
  imports: [IonicModule, CommonModule, NgTemplateOutlet, MenuCardRectComponent, MenuCardCircComponent],
  templateUrl: './offers-carousel.component.html',
  styleUrls: ['./offers-carousel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OffersCarouselComponent {
  @Input() title = '';
  @Input() cardType: CardType = 'rect';
  @Input() items: (ServiceItem | Provider)[] = [];

  // Swiper config via attributes (web component)
  slidesPerView = this.cardType === 'rect' ? 1.3 : 3.2;

  constructor(private modalCtrl: ModalController) {}

  async openFeed() {
    const modal = await this.modalCtrl.create({
      component: OffersFeedModalComponent,
      componentProps: {
        title: this.title,
        cardType: this.cardType,
        items: this.items,
      },
    });
    await modal.present();
  }
}
