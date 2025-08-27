import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SchedulerService {
  generateSlots(start = '09:00', end = '17:00', intervalMin = 60): string[] {
    const slots: string[] = [];
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const current = new Date();
    current.setHours(sh, sm, 0, 0);
    const endDate = new Date();
    endDate.setHours(eh, em, 0, 0);
    while (current <= endDate) {
      slots.push(current.toTimeString().slice(0,5));
      current.setMinutes(current.getMinutes() + intervalMin);
    }
    return slots;
  }
}
