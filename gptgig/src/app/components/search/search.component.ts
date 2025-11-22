import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchOptions } from '../../models/search-options';
import { SearchService } from '../../services/search.service';
import { ServiceItem } from '../../models/catalog.models';
import { addIcons } from 'ionicons';
import { optionsOutline } from 'ionicons/icons';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  query = '';
  showAdvanced = false;
  options: SearchOptions = {};
  results: ServiceItem[] = [];

  @Output() search = new EventEmitter<SearchOptions>();

  constructor(private searchSvc: SearchService) {
    addIcons({ optionsOutline });
  }

  onSearchChange(event: any) {
    this.query = event?.target?.value ?? '';
    this.options.query = this.query;
    if (this.query) {
      this.searchSvc.search({ query: this.query }).subscribe(res => this.results = res);
    } else {
      this.results = [];
    }
    this.emitSearch();
  }

  selectResult(item: ServiceItem) {
    this.query = item.title;
    this.results = [];
    this.options.query = this.query;
    this.emitSearch();
  }

  toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }

  emitSearch() {
    this.search.emit({ ...this.options });
  }
}
