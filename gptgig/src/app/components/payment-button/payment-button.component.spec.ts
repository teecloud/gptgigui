import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentButtonComponent } from './payment-button.component';
import { PaymentService } from '../../services/payment.service';

class MockPaymentService {
  getStripe() { return Promise.resolve(null); }
  createPaymentRequest() { return Promise.resolve(null); }
  createPaymentIntent() { return { toPromise: async () => ({ clientSecret: '' }) } as any; }
}

describe('PaymentButtonComponent', () => {
  let component: PaymentButtonComponent;
  let fixture: ComponentFixture<PaymentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentButtonComponent],
      providers: [{ provide: PaymentService, useClass: MockPaymentService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
