import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsStudentComponent } from './login-as-student.component';

describe('LoginAsStudentComponent', () => {
  let component: LoginAsStudentComponent;
  let fixture: ComponentFixture<LoginAsStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAsStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
