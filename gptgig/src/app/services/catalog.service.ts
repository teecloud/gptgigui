import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceCategory, ServiceItem, Provider } from '../models/catalog.models';

const LS_KEY = 'lumorate-catalog-v1';

interface CatalogState {
  categories: ServiceCategory[];
  services: ServiceItem[];
  providers: Provider[];
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private state: CatalogState = this.load() ?? {
    categories: [
      { id: 'clean', name: 'Cleaning', icon: 'sparkles' },
      { id: 'move',  name: 'Moving',   icon: 'cube' },
      { id: 'tech',  name: 'Tech Help',icon: 'hardware-chip' },
    ],
    services: [
      { id: 'svc1', title: 'Apartment Deep Clean', categoryId: 'clean', price: 149, durationMin: 180, imageUrl: 'assets/samples/clean1.jpg', rating: 4.9 },
      { id: 'svc2', title: 'Two Movers & Truck', categoryId: 'move', price: 95, durationMin: 120, imageUrl: 'assets/samples/move1.jpg', rating: 4.7 },
      { id: 'svc3', title: 'Home Wi‑Fi Tune Up', categoryId: 'tech', price: 79, durationMin: 60, imageUrl: 'assets/samples/tech1.jpg', rating: 4.8 },
    ],
    providers: [
      { id: 'pro1', name: 'Avery J.', avatarUrl: 'assets/samples/p1.jpg', rating: 4.9, tags: ['Cleaning','Move-Out'] },
      { id: 'pro2', name: 'Kai M.',   avatarUrl: 'assets/samples/p2.jpg', rating: 4.8, tags: ['Tech Help'] },
      { id: 'pro3', name: 'Riley P.', avatarUrl: 'assets/samples/p3.jpg', rating: 4.7, tags: ['Moving'] },
    ],
  };

  categories$ = new BehaviorSubject<ServiceCategory[]>([...this.state.categories]);
  services$   = new BehaviorSubject<ServiceItem[]>([...this.state.services]);
  providers$  = new BehaviorSubject<Provider[]>([...this.state.providers]);

  private save() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state));
  }

  private load(): CatalogState | null {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) as CatalogState : null;
    // In a real app, swap to a backend API or Firebase.
  }

  upsertCategory(cat: ServiceCategory) {
    const idx = this.state.categories.findIndex(c => c.id === cat.id);
    idx > -1 ? (this.state.categories[idx] = cat) : this.state.categories.push(cat);
    this.categories$.next([...this.state.categories]);
    this.save();
  }

  upsertService(svc: ServiceItem) {
    const idx = this.state.services.findIndex(s => s.id === svc.id);
    idx > -1 ? (this.state.services[idx] = svc) : this.state.services.push(svc);
    this.services$.next([...this.state.services]);
    this.save();
  }

  upsertProvider(p: Provider) {
    const idx = this.state.providers.findIndex(x => x.id === p.id);
    idx > -1 ? (this.state.providers[idx] = p) : this.state.providers.push(p);
    this.providers$.next([...this.state.providers]);
    this.save();
  }

  // Convert uploaded image file to Base64 URL
  async toBase64(file: File): Promise<string> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject('Failed to read file.');
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
