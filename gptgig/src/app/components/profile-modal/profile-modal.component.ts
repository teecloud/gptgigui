import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async goToAdmin() {
    await this.modalCtrl.dismiss();
    this.router.navigateByUrl('/tabs/admin');
  }
}
