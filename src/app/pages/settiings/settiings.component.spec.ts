import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettiingsComponent } from './settiings.component';

describe('SettiingsComponent', () => {
  let component: SettiingsComponent;
  let fixture: ComponentFixture<SettiingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettiingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettiingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
