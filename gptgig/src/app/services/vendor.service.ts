import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VendorProfile {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class VendorService {
  private baseUrl = environment.apiUrl + '/vendors';
  private http = inject(HttpClient);

  search(query: string): Observable<VendorProfile[]> {
    return this.http.get<VendorProfile[]>(this.baseUrl, { params: { q: query } });
  }
}
