import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionComponent } from './prediction.component';

describe('UserProfileComponent', () => {
  let component: PredictionComponent;
  let fixture: ComponentFixture<PredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
