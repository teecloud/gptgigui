import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Provider } from '../../models/catalog.models';

@Component({
  standalone: true,
  selector: 'app-menu-card-circ',
  imports: [IonicModule, CommonModule],
  templateUrl: './menu-card-circ.component.html',
  styleUrls: ['./menu-card-circ.component.scss']
})
export class MenuCardCircComponent {
  @Input() provider!: Provider;
}
