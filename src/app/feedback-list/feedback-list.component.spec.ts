import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackComponent } from '../feedback/feedback.component';

import { FeedbackListComponent } from './feedback-list.component';

describe('FeedbackListComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
