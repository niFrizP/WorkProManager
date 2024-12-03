import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOrdenComponent } from './historial-orden.component';

describe('HistorialOrdenComponent', () => {
  let component: HistorialOrdenComponent;
  let fixture: ComponentFixture<HistorialOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
