import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Profile, ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  profile: Profile | null = null;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
      },
      error: () => {
        this.profile = null;
      }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async goToAdmin() {
    await this.modalCtrl.dismiss();
    this.router.navigateByUrl('/tabs/admin');
  }

  private async navigateToLogin() {
    await this.modalCtrl.dismiss();
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.navigateToLogin(),
      error: () => this.navigateToLogin()
    });
  }
}
