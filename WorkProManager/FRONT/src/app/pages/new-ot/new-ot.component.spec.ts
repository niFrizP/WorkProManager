import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOtComponent } from './new-ot.component';

describe('NewOtComponent', () => {
  let component: NewOtComponent;
  let fixture: ComponentFixture<NewOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
