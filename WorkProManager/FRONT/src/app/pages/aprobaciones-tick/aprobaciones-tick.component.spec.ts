import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesTickComponent } from './aprobaciones-tick.component';

describe('AprobacionesTickComponent', () => {
  let component: AprobacionesTickComponent;
  let fixture: ComponentFixture<AprobacionesTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobacionesTickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionesTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
