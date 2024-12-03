import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicioOrdenComponent } from './modal-servicio-orden.component';

describe('ModalServicioOrdenComponent', () => {
  let component: ModalServicioOrdenComponent;
  let fixture: ComponentFixture<ModalServicioOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalServicioOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalServicioOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
