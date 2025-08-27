import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Profile {
  id: number;
  displayName: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = environment.apiUrl + '/profiles';
  private http = inject(HttpClient);

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.baseUrl);
  }

  createProfile(data: { displayName: string }): Observable<Profile> {
    return this.http.post<Profile>(this.baseUrl, data);
  }

  updateProfile(data: { displayName: string }): Observable<Profile> {
    return this.http.put<Profile>(this.baseUrl, data);
  }

  deleteProfile(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}
