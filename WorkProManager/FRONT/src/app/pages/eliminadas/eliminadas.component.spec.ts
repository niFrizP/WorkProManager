import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminadasComponent } from './eliminadas.component';

describe('EliminadasComponent', () => {
  let component: EliminadasComponent;
  let fixture: ComponentFixture<EliminadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
