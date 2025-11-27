import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { ProfileService } from 'src/app/services/profile.service';
import { PhotoService } from 'src/app/services/photo.service';
import { of } from 'rxjs';
import { Platform } from '@ionic/angular';

class MockProfileService {
  getProfile() { return of(); }
  createProfile(data: any) { return of({ id: 1, displayName: data.displayName, avatarUrl: data.avatarUrl }); }
  updateProfile(data: any) { return of({ id: 1, displayName: data.displayName, avatarUrl: data.avatarUrl }); }
  deleteProfile() { return of(void 0); }
}

class MockPhotoService {
  captureBase64() { return Promise.resolve('data:image/png;base64,abc'); }
  pickFromGallery() { return Promise.resolve('data:image/png;base64,xyz'); }
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        { provide: ProfileService, useClass: MockProfileService },
        { provide: PhotoService, useClass: MockPhotoService },
        { provide: Platform, useValue: { is: () => false } }
      ]
    });
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
