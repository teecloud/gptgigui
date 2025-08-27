import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private baseUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) {}

  getMessages(userId: string, otherUserId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${userId}/${otherUserId}`);
  }

  sendMessage(data: { senderId: string; recipientId: string; content: string }): Observable<Message> {
    return this.http.post<Message>(this.baseUrl, data);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/read`, {});
  }
}
