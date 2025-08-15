import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  standalone: true,
  imports: [FormsModule, IonContent, IonInput, IonButton]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe();
  }
}
