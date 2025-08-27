import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceItem } from '../models/catalog.models';
import { environment } from '../../environments/environment';
import { SearchOptions } from '../models/search-options';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private baseUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  search(options: SearchOptions): Observable<ServiceItem[]> {
    let params = new HttpParams();
    if (options.query) params = params.set('query', options.query);
    if (options.categoryId) params = params.set('categoryId', options.categoryId);
    if (options.minPrice != null) params = params.set('minPrice', options.minPrice);
    if (options.maxPrice != null) params = params.set('maxPrice', options.maxPrice);
    if (options.minRating != null) params = params.set('minRating', options.minRating);
    if (options.tags) {
      options.tags.forEach(t => params = params.append('tags', t));
    }
    return this.http.get<ServiceItem[]>(this.baseUrl, { params });
  }
}
