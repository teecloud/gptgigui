import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PageToolbarComponent } from 'src/app/components/page-toolbar/page-toolbar.component';
import { CatalogService } from '../../../services/catalog.service';
import { map } from 'rxjs';
import { MenuCardRectComponent } from '../../../components/menu-card-rect/menu-card-rect.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PageToolbarComponent, AsyncPipe, MenuCardRectComponent]
})
export class ServicesPage {
  private catalog = inject(CatalogService);

  wishlist$ = this.catalog.services$.pipe(map(list => list.filter(item => item.wishlist)));
}
