import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceItem } from '../models/catalog.models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private selectedItemSubject = new BehaviorSubject<ServiceItem | null>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  selectItem(item: ServiceItem) {
    this.selectedItemSubject.next(item);
  }

  clear() {
    this.selectedItemSubject.next(null);
  }

  getSelectedItem(): ServiceItem | null {
    return this.selectedItemSubject.value;
  }
}

