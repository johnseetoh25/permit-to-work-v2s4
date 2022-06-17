import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogComponent } from './tracking-log.component';

describe('TrackingLogComponent', () => {
  let component: TrackingLogComponent;
  let fixture: ComponentFixture<TrackingLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});