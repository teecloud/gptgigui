import { Component, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusinessService, BusinessRegistration } from '../../services/business.service';

@Component({
  selector: 'app-business-wizard',
  standalone: true,
  templateUrl: './business-wizard.component.html',
  styleUrls: ['./business-wizard.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BusinessWizardComponent {
  closed = output<void>();
  step = signal(1);
  data: BusinessRegistration = {
    structure: '',
    name: '',
    ein: '',
    licenses: '',
    bankInfo: '',
    taxes: '',
    insurance: '',
    operations: ''
  };

  private service = inject(BusinessService);

  next() {
    if (this.step() < 8) {
      this.step.update((s) => s + 1);
    }
  }

  prev() {
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
    }
  }

  complete() {
    this.service.createBusiness(this.data).subscribe(() => {
      this.closed.emit();
    });
  }
}
