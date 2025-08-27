import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { PageToolbarComponent } from 'src/app/components/page-toolbar/page-toolbar.component';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonItem, IonInput, IonButton, CommonModule, FormsModule, PageToolbarComponent]
})
export class InboxPage implements OnInit {
  messages: Message[] = [];
  newMessage = '';
  currentUserId = 'user1';
  recipientId = 'user2';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.currentUserId, this.recipientId).subscribe(res => {
      this.messages = res;
      this.messages
        .filter(m => !m.isRead && m.recipientId === this.currentUserId)
        .forEach(m => this.messageService.markAsRead(m.id).subscribe());
    });
  }

  send() {
    const content = this.newMessage.trim();
    if (!content) {
      return;
    }
    this.messageService
      .sendMessage({ senderId: this.currentUserId, recipientId: this.recipientId, content })
      .subscribe(msg => {
        this.messages.push(msg);
        this.newMessage = '';
      });
  }
}
