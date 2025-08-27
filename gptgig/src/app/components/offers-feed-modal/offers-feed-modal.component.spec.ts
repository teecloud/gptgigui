import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OffersFeedModalComponent } from './offers-feed-modal.component';

describe('OffersFeedModalComponent', () => {
  let component: OffersFeedModalComponent;
  let fixture: ComponentFixture<OffersFeedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersFeedModalComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OffersFeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
