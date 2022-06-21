import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminateDialogComponent } from './terminate-dialog.component';

describe('TerminateDialogComponent', () => {
  let component: TerminateDialogComponent;
  let fixture: ComponentFixture<TerminateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});