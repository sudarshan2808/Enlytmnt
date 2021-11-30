import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorProfileComponent } from './counsellor-profile.component';

describe('CounsellorProfileComponent', () => {
  let component: CounsellorProfileComponent;
  let fixture: ComponentFixture<CounsellorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounsellorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
