import { Component, inject } from '@angular/core';
import { IonicModule, ToastController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from '../../../services/catalog.service';
import { PhotoService } from '../../../services/photo.service';
import { MenuCardRectComponent } from '../../../components/menu-card-rect/menu-card-rect.component';
import { MenuCardCircComponent } from '../../../components/menu-card-circ/menu-card-circ.component';
import { ServiceItem, ServiceProvider } from '../../../models/catalog.models';
import { DEFAULT_TEMPLATES } from '../../../models/default-templates';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MenuCardRectComponent,
    MenuCardCircComponent,
  ],
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

  section: 'templates' | 'categories' | 'services' | 'providers' | 'preview' = 'templates';
  editingSvc = false;
  editingProv = false;
  selectedTemplate: string | null = null;
  templates = DEFAULT_TEMPLATES;
  templateKeys = Object.keys(DEFAULT_TEMPLATES);

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
    imageUrl: [''],
    description: ['']
  });

  providerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    rating: [4.8],
    avatarUrl: ['']
  });

  constructor() {
    const saved = JSON.parse(localStorage.getItem('adminState') || '{}');
    if (saved.section) this.section = saved.section;
    if (saved.selectedTemplate) {
      this.selectedTemplate = saved.selectedTemplate;
      const tmpl = this.templates[this.selectedTemplate as string];
      if (tmpl) this.catalog.loadTemplate(tmpl);
    }
    if (saved.catForm) this.catForm.patchValue(saved.catForm);
    if (saved.svcForm) this.svcForm.patchValue(saved.svcForm);
    if (saved.providerForm) this.providerForm.patchValue(saved.providerForm);

    this.catForm.valueChanges.subscribe(() => this.saveState());
    this.svcForm.valueChanges.subscribe(() => this.saveState());
    this.providerForm.valueChanges.subscribe(() => this.saveState());
  }

  async onCatSubmit() {
    const val = this.catForm.value;
    if (!val.id) val.id = 'cat-' + Date.now().toString();
    this.catalog.upsertCategory(val as any).subscribe(() => {
      this.catForm.reset({ icon: 'briefcase' });
      this.toastMsg('Category saved');
      this.saveState();
    });
  }

  async onSvcSubmit() {
    const val = this.svcForm.value;
    if (!val.id) val.id = 'svc-' + Date.now().toString();
    this.catalog.upsertService(val as any).subscribe(() => {
      this.svcForm.reset();
      this.toastMsg('Service saved');
      if (this.editingSvc) {
        this.editingSvc = false;
      }
      this.saveState();
    });
  }

  async onProvSubmit() {
    const val = this.providerForm.value;
    if (!val.id) val.id = 'pro-' + Date.now().toString();
    this.catalog.upsertProvider(val as any).subscribe(() => {
      this.providerForm.reset({ rating: 4.8 });
      this.toastMsg('Provider saved');
      if (this.editingProv) {
        this.editingProv = false;
      }
      this.saveState();
    });
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
    const base64 = await this.photoSvc.pickFromGallery();
    if (base64) {
      if (control === 'imageUrl') this.svcForm.patchValue({ imageUrl: base64 });
      if (control === 'avatarUrl') this.providerForm.patchValue({ avatarUrl: base64 });
    }
  }

  private async toastMsg(message: string) {
    const t = await this.toast.create({ message, duration: 1200, position: 'bottom' });
    await t.present();
  }

  editService(s: ServiceItem) {
    this.svcForm.patchValue(s as any);
    this.editingSvc = true;
    this.setSection('services');
  }

  editProvider(p: ServiceProvider) {
    this.providerForm.patchValue(p as any);
    this.editingProv = true;
    this.setSection('providers');
  }

  setSection(sec: typeof this.section) {
    this.section = sec;
    this.saveState();
  }

  selectTemplate(key: string) {
    this.selectedTemplate = key;
    const tmpl = this.templates[key];
    if (tmpl) this.catalog.loadTemplate(tmpl);
    this.saveState();
  }

  private saveState() {
    const state = {
      section: this.section,
      selectedTemplate: this.selectedTemplate,
      catForm: this.catForm.value,
      svcForm: this.svcForm.value,
      providerForm: this.providerForm.value
    };
    localStorage.setItem('adminState', JSON.stringify(state));
  }
}
