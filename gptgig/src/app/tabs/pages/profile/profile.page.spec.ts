import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { ProfileService } from 'src/app/services/profile.service';
import { of } from 'rxjs';

class MockProfileService {
  getProfile() { return of(); }
  createProfile(data: any) { return of({ id: 1, displayName: data.displayName }); }
  updateProfile(data: any) { return of({ id: 1, displayName: data.displayName }); }
  deleteProfile() { return of(void 0); }
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [{ provide: ProfileService, useClass: MockProfileService }]
    });
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
