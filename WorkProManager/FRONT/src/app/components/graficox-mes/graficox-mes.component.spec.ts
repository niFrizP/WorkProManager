import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoxMesComponent } from './graficox-mes.component';

describe('GraficoxMesComponent', () => {
  let component: GraficoxMesComponent;
  let fixture: ComponentFixture<GraficoxMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoxMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoxMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
