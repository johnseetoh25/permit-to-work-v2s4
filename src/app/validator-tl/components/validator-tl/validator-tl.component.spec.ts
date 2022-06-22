import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorTlComponent } from './validator-tl.component';

describe('ValidatorTlComponent', () => {
  let component: ValidatorTlComponent;
  let fixture: ComponentFixture<ValidatorTlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorTlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorTlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});