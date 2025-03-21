import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLatestSalesComponent } from './dashboard-latest-sales.component';

describe('DashboardLatestSalesComponent', () => {
  let component: DashboardLatestSalesComponent;
  let fixture: ComponentFixture<DashboardLatestSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLatestSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLatestSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
