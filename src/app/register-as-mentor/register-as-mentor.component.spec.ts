import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsMentorComponent } from './register-as-mentor.component';

describe('RegisterAsMentorComponent', () => {
  let component: RegisterAsMentorComponent;
  let fixture: ComponentFixture<RegisterAsMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAsMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
