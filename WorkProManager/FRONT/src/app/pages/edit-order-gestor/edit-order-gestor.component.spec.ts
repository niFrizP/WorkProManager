import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderGestorComponent } from './edit-order-gestor.component';

describe('EditOrderGestorComponent', () => {
  let component: EditOrderGestorComponent;
  let fixture: ComponentFixture<EditOrderGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrderGestorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrderGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
