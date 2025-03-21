import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPendingOrdersComponent } from './dashboard-pending-orders.component';

describe('DashboardPendingOrdersComponent', () => {
  let component: DashboardPendingOrdersComponent;
  let fixture: ComponentFixture<DashboardPendingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPendingOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
