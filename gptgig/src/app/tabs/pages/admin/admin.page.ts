import { Component, inject } from '@angular/core';
import { IonicModule, ToastController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from '../../../services/catalog.service';
import { PhotoService } from '../../../services/photo.service';


// Lightweight UUID (optional): if you prefer, replace with Date.now().toString()

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage {
  private fb = inject(FormBuilder);
  private catalog = inject(CatalogService);
  private toast = inject(ToastController);
  private platform = inject(Platform);
  private photoSvc = inject(PhotoService);
  isMobile = this.platform.is('hybrid');

  categories$ = this.catalog.categories$;
  services$   = this.catalog.services$;
  providers$  = this.catalog.providers$;

  catForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    icon: ['briefcase']
  });

  svcForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    categoryId: [''],
    price: [null],
    durationMin: [null],
    imageUrl: ['']
  });

  providerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    rating: [4.8],
    avatarUrl: ['']
  });

  async onCatSubmit() {
    const val = this.catForm.value;
    if (!val.id) val.id = 'cat-' +  Date.now().toString();
    this.catalog.upsertCategory(val as any);
    this.catForm.reset({ icon: 'briefcase' });
    this.toastMsg('Category saved');
  }

  async onSvcSubmit() {
    const val = this.svcForm.value;
    if (!val.id) val.id = 'svc-' + Date.now().toString();
    this.catalog.upsertService(val as any);
    this.svcForm.reset();
    this.toastMsg('Service saved');
  }

  async onProvSubmit() {
    const val = this.providerForm.value;
    if (!val.id) val.id = 'pro-' + Date.now().toString();
    this.catalog.upsertProvider(val as any);
    this.providerForm.reset({ rating: 4.8 });
    this.toastMsg('Provider saved');
  }

  async handleFile(event: Event, control: 'imageUrl' | 'avatarUrl') {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const base64 = await this.catalog.toBase64(input.files[0]);
      if (control === 'imageUrl') this.svcForm.patchValue({ imageUrl: base64 });
      if (control === 'avatarUrl') this.providerForm.patchValue({ avatarUrl: base64 });
    }
  }

  async captureImage(control: 'imageUrl' | 'avatarUrl') {
    const base64 = await this.photoSvc.captureBase64();
    if (base64) {
      if (control === 'imageUrl') this.svcForm.patchValue({ imageUrl: base64 });
      if (control === 'avatarUrl') this.providerForm.patchValue({ avatarUrl: base64 });
    }
  }

  private async toastMsg(message: string) {
    const t = await this.toast.create({ message, duration: 1200, position: 'bottom' });
    await t.present();
  }
}
