import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqcancDialogComponent } from './reqcanc-dialog.component';

describe('ReqcancDialogComponent', () => {
  let component: ReqcancDialogComponent;
  let fixture: ComponentFixture<ReqcancDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqcancDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqcancDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
