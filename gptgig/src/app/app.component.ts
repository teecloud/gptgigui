import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
<<<<<<< HEAD
import { OfflineService } from './services/offline.service';
=======
import { ToastService } from './services/toast.service';
>>>>>>> main

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
<<<<<<< HEAD
export class AppComponent {
  constructor(private offline: OfflineService) {
    document.documentElement.classList.add('dark');
=======
export class AppComponent implements OnInit, OnDestroy {
  private toast = inject(ToastService);

  constructor() {
     document.documentElement.classList.add('dark');
>>>>>>> main
  }

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
