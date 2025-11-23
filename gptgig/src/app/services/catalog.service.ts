import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceCategory, ServiceItem, Provider, CatalogTemplate } from '../models/catalog.models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = `${environment.apiUrl}/catalog`;

  categories$ = new BehaviorSubject<ServiceCategory[]>([]);
  services$   = new BehaviorSubject<ServiceItem[]>([]);
  providers$  = new BehaviorSubject<Provider[]>([]);

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('catalogTemplateData');
    if (saved) {
      const data = JSON.parse(saved) as CatalogTemplate;
      this.categories$.next(data.categories);
      this.services$.next(this.applyWishlistFlag(data.services));
      this.providers$.next(data.providers);
    }
    this.refresh();
  }

  /** Load catalog items from backend API */
  refresh() {
    this.http.get<ServiceCategory[]>(`${this.baseUrl}/categories`)
      .subscribe(data => {
        this.categories$.next(data);
        this.saveLocal();
      });

    this.http.get<ServiceItem[]>(`${this.baseUrl}/services`)
      .subscribe(data => {
        this.services$.next(this.applyWishlistFlag(data));
        this.saveLocal();
      });

    this.http.get<Provider[]>(`${this.baseUrl}/providers`)
      .subscribe(data => {
        this.providers$.next(data);
        this.saveLocal();
      });
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

  loadTemplate(t: CatalogTemplate) {
    this.categories$.next(t.categories);
    this.services$.next(this.applyWishlistFlag(t.services));
    this.providers$.next(t.providers);
    this.saveLocal();
  }

  toggleWishlist(serviceId: string) {
    const services = this.services$.value.map(svc =>
      svc.id === serviceId ? { ...svc, wishlist: !svc.wishlist } : svc
    );
    this.services$.next(services);
    this.saveLocal();
  }

  private applyWishlistFlag(items: ServiceItem[]) {
    const wishlistMap = new Map(this.services$.value.map(s => [s.id, !!s.wishlist]));
    return items.map(it => ({
      ...it,
      wishlist: wishlistMap.get(it.id) ?? it.wishlist ?? false
    }));
  }

  private saveLocal() {
    const data: CatalogTemplate = {
      categories: this.categories$.value,
      services: this.services$.value,
      providers: this.providers$.value
    };
    localStorage.setItem('catalogTemplateData', JSON.stringify(data));
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

