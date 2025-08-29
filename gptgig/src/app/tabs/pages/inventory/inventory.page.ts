import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatalogService } from '../../../services/catalog.service';
import { ServiceItem } from '../../../models/catalog.models';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { PageToolbarComponent } from '../../../components/page-toolbar/page-toolbar.component';
import { addIcons } from 'ionicons';
import { scanOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, AsyncPipe, CurrencyPipe, PageToolbarComponent]
})
export class InventoryPage {
  private catalog = inject(CatalogService);
  private router = inject(Router);
  private codeReader = new BrowserMultiFormatReader();

  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;

  private filter$ = new BehaviorSubject<string>('');
  products$ = combineLatest([this.catalog.services$, this.filter$]).pipe(
    map(([items, filter]) =>
      items.filter(i => i.title.toLowerCase().includes(filter.toLowerCase()))
    )
  );

  scanning = false;

  constructor() {
    addIcons({ scanOutline });
  }

  onFilter(ev: any) {
    this.filter$.next(ev?.target?.value ?? '');
  }

  openDetail(item: ServiceItem) {
    this.router.navigate(['/item', item.id]);
  }

  async scanProduct() {
    this.scanning = true;
    try {
      if (!this.video) {
        this.scanning = false;
        return;
      }
      const result = await this.codeReader.decodeOnceFromVideoDevice(undefined, this.video.nativeElement);
      this.scanning = false;
      (this.codeReader as any).reset();
      const id = result.getText();
      const item = this.catalog.services$.value.find(s => s.id === id);
      if (item) {
        this.router.navigate(['/item', item.id]);
      }
    } catch (err) {
      console.error('Scan failed', err);
      this.scanning = false;
      (this.codeReader as any).reset();
    }
  }
}

