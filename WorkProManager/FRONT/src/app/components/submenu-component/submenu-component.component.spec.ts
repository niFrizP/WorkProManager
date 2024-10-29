import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuComponentComponent } from './submenu-component.component';

describe('SubmenuComponentComponent', () => {
  let component: SubmenuComponentComponent;
  let fixture: ComponentFixture<SubmenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmenuComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
