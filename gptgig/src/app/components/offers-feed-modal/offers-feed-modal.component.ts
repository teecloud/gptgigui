import { Component, Input } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { MenuCardRectComponent } from '../menu-card-rect/menu-card-rect.component';
import { MenuCardCircComponent } from '../menu-card-circ/menu-card-circ.component';
import { ServiceItem, ServiceProvider } from '../../models/catalog.models';

type CardType = 'rect' | 'circ';

@Component({
  selector: 'app-offers-feed-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, NgTemplateOutlet, MenuCardRectComponent, MenuCardCircComponent],
  templateUrl: './offers-feed-modal.component.html',
  styleUrls: ['./offers-feed-modal.component.scss']
})
export class OffersFeedModalComponent {
  @Input() title = '';
  @Input() cardType: CardType = 'rect';
  @Input() items: (ServiceItem | ServiceProvider)[] = [];

  feedItems: (ServiceItem | ServiceProvider)[] = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.appendItems();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  loadData(event: any) {
    this.appendItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  private appendItems() {
    // For demo purposes, repeat the provided items
    this.feedItems = [...this.feedItems, ...this.items];
  }
}
