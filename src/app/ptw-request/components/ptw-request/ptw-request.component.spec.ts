import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PtwRequestComponent } from './ptw-request.component';

describe('PtwRequestComponent', () => {
  let component: PtwRequestComponent;
  let fixture: ComponentFixture<PtwRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtwRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtwRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});