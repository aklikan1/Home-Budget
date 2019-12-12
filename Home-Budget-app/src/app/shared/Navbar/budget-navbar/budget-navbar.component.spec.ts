import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetNavbarComponent } from './budget-navbar.component';

describe('BudgetNavbarComponent', () => {
  let component: BudgetNavbarComponent;
  let fixture: ComponentFixture<BudgetNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
