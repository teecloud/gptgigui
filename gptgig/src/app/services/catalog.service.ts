import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceCategory, ServiceItem, Provider } from '../models/catalog.models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = `${environment.apiUrl}/catalog`;

  categories$ = new BehaviorSubject<ServiceCategory[]>([]);
  services$   = new BehaviorSubject<ServiceItem[]>([]);
  providers$  = new BehaviorSubject<Provider[]>([]);

  constructor(private http: HttpClient) {
    this.refresh();
  }

  /** Load catalog items from backend API */
  refresh() {
    this.http.get<ServiceCategory[]>(`${this.baseUrl}/categories`)
      .subscribe(data => this.categories$.next(data));

    this.http.get<ServiceItem[]>(`${this.baseUrl}/services`)
      .subscribe(data => this.services$.next(data));

    this.http.get<Provider[]>(`${this.baseUrl}/providers`)
      .subscribe(data => this.providers$.next(data));
  }

  /** Upsert category via backend */
  upsertCategory(cat: ServiceCategory) {
    return this.http.post<ServiceCategory>(`${this.baseUrl}/categories`, cat)
      .pipe(tap(() => this.refresh()));
  }

  /** Upsert service via backend */
  upsertService(svc: ServiceItem) {
    return this.http.post<ServiceItem>(`${this.baseUrl}/services`, svc)
      .pipe(tap(() => this.refresh()));
  }

  /** Upsert provider via backend */
  upsertProvider(p: Provider) {
    return this.http.post<Provider>(`${this.baseUrl}/providers`, p)
      .pipe(tap(() => this.refresh()));
  }

  // Convert uploaded image file to Base64 URL
  async toBase64(file: File): Promise<string> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject('Failed to read file.');
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}

