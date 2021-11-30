import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsCounsellorComponent } from './login-as-counsellor.component';

describe('LoginAsCounsellorComponent', () => {
  let component: LoginAsCounsellorComponent;
  let fixture: ComponentFixture<LoginAsCounsellorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAsCounsellorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAsCounsellorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
