import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TenantService } from './tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantId = inject(TenantService).getTenant();
  req = req.clone({ setHeaders: { 'X-Tenant-ID': tenantId } });
  return next(req);
};
