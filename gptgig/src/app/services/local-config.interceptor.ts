import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

export const localConfigInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useLocalConfig || !environment.localConfig) {
    return next(req);
  }

  const cfg = environment.localConfig;
  const url = req.url;

  // Profiles
  if (url.endsWith('/profiles')) {
    if (req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: cfg.profiles }));
    }
    if (req.method === 'POST') {
      const newProfile = { id: cfg.profiles.length + 1, ...req.body };
      cfg.profiles.push(newProfile);
      return of(new HttpResponse({ status: 200, body: newProfile }));
    }
    if (req.method === 'PUT') {
      cfg.profiles[0] = { ...cfg.profiles[0], ...req.body };
      return of(new HttpResponse({ status: 200, body: cfg.profiles[0] }));
    }
    if (req.method === 'DELETE') {
      return of(new HttpResponse({ status: 200 }));
    }
  }

  // Messages
  if (url.includes('/messages')) {
    if (req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: cfg.messages }));
    }
    if (req.method === 'POST') {
      const newMsg = {
        id: cfg.messages.length + 1,
        timestamp: new Date().toISOString(),
        isRead: false,
        ...req.body
      };
      cfg.messages.push(newMsg);
      return of(new HttpResponse({ status: 200, body: newMsg }));
    }
    if (url.match(/\/read$/)) {
      return of(new HttpResponse({ status: 200 }));
    }
  }

  // Vendors
  if (url.includes('/vendors')) {
    return of(new HttpResponse({ status: 200, body: cfg.vendors }));
  }

  // Catalog
  if (url.includes('/catalog/categories')) {
    return of(new HttpResponse({ status: 200, body: cfg.categories }));
  }
  if (url.includes('/catalog/services')) {
    return of(new HttpResponse({ status: 200, body: cfg.services }));
  }
  if (url.includes('/catalog/providers')) {
    return of(new HttpResponse({ status: 200, body: cfg.providers }));
  }

  // Search
  if (url.includes('/search')) {
    return of(new HttpResponse({ status: 200, body: cfg.searchResults }));
  }

  // Payment intent
  if (url.includes('/payments/create-intent')) {
    return of(new HttpResponse({ status: 200, body: cfg.paymentIntent }));
  }

  // Auth
  if (url.includes('/auth/login') || url.includes('/auth/register')) {
    return of(new HttpResponse({ status: 200, body: { token: 'local-token' } }));
  }

  // Photos
  if (url.includes('/photos') && req.method === 'POST') {
    return of(new HttpResponse({ status: 200, body: { uploaded: true } }));
  }

  return next(req);
};
