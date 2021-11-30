import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpastAppointmentComponent } from './clientpast-appointment.component';

describe('ClientpastAppointmentComponent', () => {
  let component: ClientpastAppointmentComponent;
  let fixture: ComponentFixture<ClientpastAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientpastAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpastAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
