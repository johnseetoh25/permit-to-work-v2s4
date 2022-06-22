import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorReqdetsComponent } from './validator-reqdets.component';

describe('ValidatorReqdetsComponent', () => {
  let component: ValidatorReqdetsComponent;
  let fixture: ComponentFixture<ValidatorReqdetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorReqdetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorReqdetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});