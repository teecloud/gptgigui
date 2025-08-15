import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

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

  onSearch(event: any) {
    const value = event?.target?.value ?? '';
    this.searchChange.emit(value);
  }
}
