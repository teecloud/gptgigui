import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly storageKey = 'tenantId';
  private tenantId = 'default';

  setTenant(id: string) {
    this.tenantId = id;
    localStorage.setItem(this.storageKey, id);
  }

  getTenant(): string {
    return localStorage.getItem(this.storageKey) || this.tenantId;
  }
}
