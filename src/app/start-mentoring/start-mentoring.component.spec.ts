import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMentoringComponent } from './start-mentoring.component';

describe('StartMentoringComponent', () => {
  let component: StartMentoringComponent;
  let fixture: ComponentFixture<StartMentoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMentoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMentoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
