import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonSearchbar, IonList, IonItem, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { VendorService, VendorProfile } from '../services/vendor.service';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  standalone: true,
  imports: [FormsModule, IonContent, IonInput, IonButton, IonSearchbar, IonList, IonItem, IonIcon]
})
export class RegisterPage {
  email = '';
  password = '';
  vendorQuery = '';
  vendorName = '';
  vendors: VendorProfile[] = [];

  constructor(private auth: AuthService, private vendorsService: VendorService) {
    addIcons({ addCircle });
  }

  register() {
    this.auth.register({ email: this.email, password: this.password, vendorName: this.vendorName || this.vendorQuery }).subscribe();
  }

  searchVendors() {
    if (this.vendorQuery.trim().length === 0) {
      this.vendors = [];
      return;
    }
    this.vendorsService.search(this.vendorQuery).subscribe(v => (this.vendors = v));
  }

  selectVendor(v: VendorProfile) {
    this.vendorQuery = v.name;
    this.vendorName = v.name;
    this.vendors = [];
  }

  addVendor() {
    this.vendorName = this.vendorQuery;
  }
}
