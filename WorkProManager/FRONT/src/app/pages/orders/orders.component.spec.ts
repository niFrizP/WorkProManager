import { ComponentFixture, TestBed } from '@angular/core/testing';

import { orden_trabajosComponent } from './orders.component';

describe('orden_trabajosComponent', () => {
  let component: orden_trabajosComponent;
  let fixture: ComponentFixture<orden_trabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [orden_trabajosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(orden_trabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
