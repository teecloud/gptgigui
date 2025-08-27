import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
     
       { path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
      { path: 'cart', loadComponent: () => import('../cart/cart.page').then(m => m.CartPage) },
      { path: 'services', loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage) },
      { path: 'inbox', loadComponent: () => import('./pages/inbox/inbox.page').then(m => m.InboxPage) },
      { path: 'social', loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage) },
      { path: 'admin', loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage) },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  }
];
