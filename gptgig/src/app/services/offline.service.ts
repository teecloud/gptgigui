import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface QueuedPost {
  url: string;
  body: any;
  headers: { [key: string]: string };
}

/**
 * Service that retries queued POST requests when the connection is restored.
 */
@Injectable({ providedIn: 'root' })
export class OfflineService {
  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.flushQueue());
    if (navigator.onLine) {
      this.flushQueue();
    }
  }

  private flushQueue() {
    const raw = localStorage.getItem('postQueue');
    if (!raw) {
      return;
    }
    const queue: QueuedPost[] = JSON.parse(raw);
    for (const q of queue) {
      this.http
        .post(q.url, q.body, { headers: new HttpHeaders(q.headers) })
        .subscribe();
    }
    localStorage.removeItem('postQueue');
  }
}
