import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialServicioComponent } from './historial-servicio.component';

describe('HistorialServicioComponent', () => {
  let component: HistorialServicioComponent;
  let fixture: ComponentFixture<HistorialServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
