import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PageToolbarComponent } from '../components/page-toolbar/page-toolbar.component';
import { PaymentButtonComponent } from '../components/payment-button/payment-button.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonContent, ExploreContainerComponent, PageToolbarComponent, PaymentButtonComponent],
})
export class Tab1Page {
  constructor() {}
}
