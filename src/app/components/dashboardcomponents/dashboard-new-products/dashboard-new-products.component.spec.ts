import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewProductsComponent } from './dashboard-new-products.component';

describe('DashboardNewProductsComponent', () => {
  let component: DashboardNewProductsComponent;
  let fixture: ComponentFixture<DashboardNewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNewProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardNewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
