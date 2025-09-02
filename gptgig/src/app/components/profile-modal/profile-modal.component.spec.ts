import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileModalComponent } from './profile-modal.component';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

class MockProfileService {
  getProfile() {
    return of({ id: 1, displayName: 'Test User' });
  }
}

describe('ProfileModalComponent', () => {
  let component: ProfileModalComponent;
  let fixture: ComponentFixture<ProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileModalComponent, IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: ProfileService, useClass: MockProfileService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
