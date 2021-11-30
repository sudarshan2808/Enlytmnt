import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppointmentNotesComponent } from './past-appointment-notes.component';

describe('PastAppointmentNotesComponent', () => {
  let component: PastAppointmentNotesComponent;
  let fixture: ComponentFixture<PastAppointmentNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastAppointmentNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAppointmentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
