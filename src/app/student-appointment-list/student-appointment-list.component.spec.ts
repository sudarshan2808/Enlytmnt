import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppointmentListComponent } from './student-appointment-list.component';

describe('StudentAppointmentListComponent', () => {
  let component: StudentAppointmentListComponent;
  let fixture: ComponentFixture<StudentAppointmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAppointmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
