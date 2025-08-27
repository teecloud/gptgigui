import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastCtrl = inject(ToastController);

  async show(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await t.present();
  }
}
