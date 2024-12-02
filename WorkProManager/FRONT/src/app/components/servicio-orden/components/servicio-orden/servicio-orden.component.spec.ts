import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioOrdenComponent } from './servicio-orden.component';

describe('ServicioOrdenComponent', () => {
  let component: ServicioOrdenComponent;
  let fixture: ComponentFixture<ServicioOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
