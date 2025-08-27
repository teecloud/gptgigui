import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { PageToolbarComponent } from 'src/app/components/page-toolbar/page-toolbar.component';
import { Profile, ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel, CommonModule, FormsModule, PageToolbarComponent]
})
export class ProfilePage implements OnInit {
  profile: Profile | null = null;
  displayName = '';

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.displayName = res.displayName;
      },
      error: () => {
        this.profile = null;
      }
    });
  }

  saveProfile() {
    const action = this.profile
      ? this.profileService.updateProfile({ displayName: this.displayName })
      : this.profileService.createProfile({ displayName: this.displayName });
    action.subscribe((res) => {
      this.profile = res;
      this.displayName = res.displayName;
    });
  }

  deleteProfile() {
    this.profileService.deleteProfile().subscribe(() => {
      this.profile = null;
      this.displayName = '';
    });
  }
}
