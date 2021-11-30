import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCounsellorApplicationFormComponent } from './edit-counsellor-application-form.component';

describe('EditCounsellorApplicationFormComponent', () => {
  let component: EditCounsellorApplicationFormComponent;
  let fixture: ComponentFixture<EditCounsellorApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCounsellorApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCounsellorApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
