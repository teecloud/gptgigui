import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
}
