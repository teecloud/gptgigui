import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { PageToolbarComponent } from 'src/app/components/page-toolbar/page-toolbar.component';
import { SearchService } from 'src/app/services/search.service';
import { SearchOptions } from 'src/app/models/search-options';
import { ServiceItem } from 'src/app/models/catalog.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule, PageToolbarComponent]
})
export class SearchPage {
  results: ServiceItem[] = [];

  constructor(private searchSvc: SearchService) {}

  onSearch(opts: SearchOptions) {
    this.searchSvc.search(opts).subscribe(res => this.results = res);
  }
}
