import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorSignInComponent } from './validator-sign-in.component';

describe('ValidatorSignInComponent', () => {
  let component: ValidatorSignInComponent;
  let fixture: ComponentFixture<ValidatorSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});