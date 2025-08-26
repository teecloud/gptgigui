import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ItemDetailPage } from './item-detail.page';
import { CatalogService } from '../services/catalog.service';
import { CartService } from '../services/cart.service';

describe('ItemDetailPage', () => {
  let component: ItemDetailPage;
  let fixture: ComponentFixture<ItemDetailPage>;
  const services$ = new BehaviorSubject<any[]>([{ id: '1', title: 'Test', description: 'desc' }]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemDetailPage, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: CatalogService, useValue: { services$ } },
        { provide: CartService, useValue: { selectItem: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

