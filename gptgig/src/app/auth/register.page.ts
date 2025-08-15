import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  standalone: true,
  imports: [FormsModule, IonContent, IonInput, IonButton]
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register({ email: this.email, password: this.password }).subscribe();
  }
}
