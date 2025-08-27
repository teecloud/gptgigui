import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchOptions } from '../../models/search-options';

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

  @Output() search = new EventEmitter<SearchOptions>();

  onSearchChange(event: any) {
    this.query = event?.target?.value ?? '';
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
