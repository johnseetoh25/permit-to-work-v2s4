import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PtwDetailsComponent } from './ptw-details.component';

describe('PtwDetailsComponent', () => {
  let component: PtwDetailsComponent;
  let fixture: ComponentFixture<PtwDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtwDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtwDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});