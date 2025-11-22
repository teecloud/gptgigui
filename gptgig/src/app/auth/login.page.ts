import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IonContent, IonInput, IonButton, IonText, IonItem, IonList} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonInput, IonButton, IonText, IonItem, IonList]
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  private blurActiveElement(): void {
    const activeElement = document.activeElement as HTMLElement | null;

    if (activeElement && typeof activeElement.blur === 'function') {
      activeElement.blur();
    }
  }

  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.errorMessage = '';
        this.auth.saveToken(res.token);
        this.blurActiveElement();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
    });
  }

  goToRegister() {
    this.blurActiveElement();
    this.router.navigateByUrl('/register');
  }
}
