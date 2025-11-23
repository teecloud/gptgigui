import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuCardRectComponent } from './menu-card-rect.component';
import { CatalogService } from '../../services/catalog.service';
describe('MenuCardRectComponent', () => {
  let component: MenuCardRectComponent;
  let fixture: ComponentFixture<MenuCardRectComponent>;
  const catalogStub = {
    toggleWishlist: jasmine.createSpy('toggleWishlist')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MenuCardRectComponent, IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: CatalogService, useValue: catalogStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCardRectComponent);
    component = fixture.componentInstance;
    component.item = { id: '1', title: 'Test Item', price: 10 } as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
