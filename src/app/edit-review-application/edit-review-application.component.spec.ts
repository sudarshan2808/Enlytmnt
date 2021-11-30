import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewApplicationComponent } from './edit-review-application.component';

describe('EditReviewApplicationComponent', () => {
  let component: EditReviewApplicationComponent;
  let fixture: ComponentFixture<EditReviewApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReviewApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
