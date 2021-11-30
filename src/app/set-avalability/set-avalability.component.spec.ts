import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAvalabilityComponent } from './set-avalability.component';

describe('SetAvalabilityComponent', () => {
  let component: SetAvalabilityComponent;
  let fixture: ComponentFixture<SetAvalabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAvalabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAvalabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
