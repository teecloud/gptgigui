import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { SearchComponent } from '../search/search.component';
import { SearchOptions } from '../../models/search-options';

@Component({
  selector: 'app-page-toolbar',
  standalone: true,
  imports: [IonicModule, CommonModule, SearchComponent],
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.scss']
})
export class PageToolbarComponent {
  @Input() title = '';
  @Input() avatarSrc = 'assets/icon/favicon.png';
  @Output() searchChange = new EventEmitter<SearchOptions>();

  constructor(private modalCtrl: ModalController) {}

  onSearch(options: SearchOptions) {
    this.searchChange.emit(options);
  }

  async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileModalComponent,
    });
    await modal.present();
  }
}
