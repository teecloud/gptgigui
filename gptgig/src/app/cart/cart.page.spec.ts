import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPage } from './cart.page';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';

class MockPaymentService {
  getStripe() { return Promise.resolve(null); }
  createPaymentRequest() { return Promise.resolve(null); }
  createPaymentIntent() { return { toPromise: () => Promise.resolve({}) }; }
}

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [CartService, { provide: PaymentService, useClass: MockPaymentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
