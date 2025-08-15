import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageToolbarComponent } from './page-toolbar.component';
import { IonicModule } from '@ionic/angular';

describe('PageToolbarComponent', () => {
  let component: PageToolbarComponent;
  let fixture: ComponentFixture<PageToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageToolbarComponent, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
