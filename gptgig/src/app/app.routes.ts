import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
    canActivate: [authGuard],
  },
  {
    path: 'social-feeds',
    loadComponent: () =>
      import('./social-feeds/social-feeds.page').then(
        (m) => m.SocialFeedsPage,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'item/:id',
    loadComponent: () =>
      import('./item-detail/item-detail.page').then((m) => m.ItemDetailPage),
    canActivate: [authGuard],
  },
];
