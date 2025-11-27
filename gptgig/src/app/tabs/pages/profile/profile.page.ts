import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel, IonAvatar, IonList } from '@ionic/angular/standalone';
import { PageToolbarComponent } from 'src/app/components/page-toolbar/page-toolbar.component';
import { Profile, ProfileService } from 'src/app/services/profile.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel, IonAvatar, IonList, CommonModule, FormsModule, PageToolbarComponent]
})
export class ProfilePage implements OnInit {
  profile: Profile | null = null;
  displayName = '';
  avatarUrl = '';
  isMobile: boolean;

  constructor(private profileService: ProfileService, private photoSvc: PhotoService, platform: Platform) {
    this.isMobile = platform.is('hybrid');
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.displayName = res.displayName;
        this.avatarUrl = res.avatarUrl || '';
      },
      error: () => {
        this.profile = null;
      }
    });
  }

  saveProfile() {
    const action = this.profile
      ? this.profileService.updateProfile({ displayName: this.displayName, avatarUrl: this.avatarUrl })
      : this.profileService.createProfile({ displayName: this.displayName, avatarUrl: this.avatarUrl });
    action.subscribe((res) => {
      this.profile = res;
      this.displayName = res.displayName;
      this.avatarUrl = res.avatarUrl || '';
    });
  }

  deleteProfile() {
    this.profileService.deleteProfile().subscribe(() => {
      this.profile = null;
      this.displayName = '';
      this.avatarUrl = '';
    });
  }

  async capturePhoto() {
    const base64 = await this.photoSvc.captureBase64();
    if (base64) {
      this.avatarUrl = base64;
    }
  }

  async onUploadClick(fileInput: HTMLInputElement) {
    if (this.isMobile) {
      const base64 = await this.photoSvc.pickFromGallery();
      if (base64) {
        this.avatarUrl = base64;
      }
      return;
    }

    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
