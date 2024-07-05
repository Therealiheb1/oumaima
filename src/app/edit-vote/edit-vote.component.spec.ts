import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVoteComponent } from './edit-vote.component';

describe('EditVoteComponent', () => {
  let component: EditVoteComponent;
  let fixture: ComponentFixture<EditVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
