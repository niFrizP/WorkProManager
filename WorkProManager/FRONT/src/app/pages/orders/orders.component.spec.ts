import { ComponentFixture, TestBed } from '@angular/core/testing';

import { orden_trabajoComponent } from './orders.component';

describe('orden_trabajoComponent', () => {
  let component: orden_trabajoComponent;
  let fixture: ComponentFixture<orden_trabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [orden_trabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(orden_trabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
