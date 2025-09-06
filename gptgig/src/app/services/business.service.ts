import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BusinessRegistration {
  structure: string;
  name: string;
  ein: string;
  licenses: string;
  bankInfo: string;
  taxes: string;
  insurance: string;
  operations: string;
}

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private baseUrl = environment.apiUrl + '/BusinessRegistrations';
  private http = inject(HttpClient);

  createBusiness(data: BusinessRegistration): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
