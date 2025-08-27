import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interceptor providing simple GET caching and offline POST queueing
export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheKey = `cache_${req.urlWithParams}`;

  if (req.method === 'GET') {
    // When offline, attempt to serve cached GET responses
    if (!navigator.onLine) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        return of(new HttpResponse({ status: 200, body: JSON.parse(cached) }));
      }
    }

    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          localStorage.setItem(cacheKey, JSON.stringify(event.body));
        }
      })
    );
  }

  if (req.method === 'POST' && !navigator.onLine) {
    // Queue POST requests while offline for retry when connection restores
    const queue = JSON.parse(localStorage.getItem('postQueue') || '[]');
    queue.push({
      url: req.urlWithParams,
      body: req.body,
      headers: req.headers
        .keys()
        .reduce((acc: any, key) => ({ ...acc, [key]: req.headers.get(key) }), {})
    });
    localStorage.setItem('postQueue', JSON.stringify(queue));
    // Respond with 202 Accepted to indicate queued request
    return of(new HttpResponse({ status: 202, body: { queued: true } }));
  }

  return next(req);
};

