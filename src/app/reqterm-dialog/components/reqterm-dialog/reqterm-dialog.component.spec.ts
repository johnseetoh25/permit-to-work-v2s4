import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqtermDialogComponent } from './reqterm-dialog.component';

describe('ReqtermDialogComponent', () => {
  let component: ReqtermDialogComponent;
  let fixture: ComponentFixture<ReqtermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqtermDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqtermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
