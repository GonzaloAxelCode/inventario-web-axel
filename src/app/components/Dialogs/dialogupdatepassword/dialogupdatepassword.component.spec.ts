import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogupdatepasswordComponent } from './dialogupdatepassword.component';

describe('DialogupdatepasswordComponent', () => {
  let component: DialogupdatepasswordComponent;
  let fixture: ComponentFixture<DialogupdatepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogupdatepasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogupdatepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
