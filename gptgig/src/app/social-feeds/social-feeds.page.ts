import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface SocialPlatform {
  name: string;
  icon: string;
  loggedIn: boolean;
}

@Component({
  selector: 'app-social-feeds',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './social-feeds.page.html',
  styleUrls: ['./social-feeds.page.scss'],
})
export class SocialFeedsPage {
  platforms: SocialPlatform[] = [
    { name: 'Facebook', icon: 'logo-facebook', loggedIn: false },
    { name: 'TikTok', icon: 'logo-tiktok', loggedIn: false },
    { name: 'Instagram', icon: 'logo-instagram', loggedIn: false },
    { name: 'Snapchat', icon: 'logo-snapchat', loggedIn: false },
    { name: 'X', icon: 'logo-twitter', loggedIn: false },
    { name: 'LinkedIn', icon: 'logo-linkedin', loggedIn: false },
    { name: 'YouTube', icon: 'logo-youtube', loggedIn: false },
  ];

  login(platform: SocialPlatform): void {
    platform.loggedIn = true;
  }

  create(platform: SocialPlatform): void {
    console.log(`create on ${platform.name}`);
  }

  read(platform: SocialPlatform): void {
    console.log(`read on ${platform.name}`);
  }

  update(platform: SocialPlatform): void {
    console.log(`update on ${platform.name}`);
  }

  delete(platform: SocialPlatform): void {
    console.log(`delete on ${platform.name}`);
  }
}
