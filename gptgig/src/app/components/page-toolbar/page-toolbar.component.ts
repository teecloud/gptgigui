import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-page-toolbar',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.scss']
})
export class PageToolbarComponent {
  @Input() title = '';
  @Input() avatarSrc = 'assets/icon/favicon.png';
  @Output() searchChange = new EventEmitter<string>();

  constructor(private modalCtrl: ModalController) {}

  onSearch(event: any) {
    const value = event?.target?.value ?? '';
    this.searchChange.emit(value);
  }

  async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileModalComponent,
    });
    await modal.present();
  }
}
