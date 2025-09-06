import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessWizardComponent } from './business-wizard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BusinessWizardComponent', () => {
  let component: BusinessWizardComponent;
  let fixture: ComponentFixture<BusinessWizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BusinessWizardComponent, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(BusinessWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
