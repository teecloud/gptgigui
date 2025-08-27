import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 1', () => {
    expect(component.step).toBe(1);
  });
});
