import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

interface SocialPlatform {
  name: string;
  icon: string;
  loggedIn: boolean;
  unavailable?: boolean;
}

@Component({
  selector: 'app-social-feeds',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
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

  private http = inject(HttpClient);

  login(platform: SocialPlatform): void {
    platform.loggedIn = true;
    platform.unavailable = false;
  }

  create(platform: SocialPlatform): void {
    console.log(`create on ${platform.name}`);
  }

  read(platform: SocialPlatform): void {
    platform.unavailable = false;
    this.http
      .get(`/api/social-feeds/${platform.name.toLowerCase()}`)
      .subscribe({
        next: (data) => {
          console.log(`read on ${platform.name}`, data);
        },
        error: () => {
          platform.unavailable = true;
        },
      });
  }

  update(platform: SocialPlatform): void {
    console.log(`update on ${platform.name}`);
  }

  delete(platform: SocialPlatform): void {
    console.log(`delete on ${platform.name}`);
  }
}
