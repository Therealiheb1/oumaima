import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormationPopupComponent } from './create-formation-popup.component';

describe('CreateFormationPopupComponent', () => {
  let component: CreateFormationPopupComponent;
  let fixture: ComponentFixture<CreateFormationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
