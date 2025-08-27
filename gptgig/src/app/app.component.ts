import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { OfflineService } from './services/offline.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {
   // document.documentElement.classList.add('dark');
  }
  private toast = inject(ToastService);
  private offline = inject(OfflineService);


  ngOnInit() {
    document.addEventListener('click', this.handleClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClick);
  }

  private handleClick = (ev: Event) => {
    const target = (ev.target as HTMLElement).closest('button, a, ion-button');
    if (target) {
      const action = target.getAttribute('data-action') || target.textContent?.trim();
      if (action) {
        this.toast.show(`${action} clicked`);
      }
    }
  };
}
