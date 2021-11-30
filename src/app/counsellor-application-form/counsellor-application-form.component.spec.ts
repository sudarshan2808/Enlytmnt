import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorApplicationFormComponent } from './counsellor-application-form.component';

describe('CounsellorApplicationFormComponent', () => {
  let component: CounsellorApplicationFormComponent;
  let fixture: ComponentFixture<CounsellorApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
