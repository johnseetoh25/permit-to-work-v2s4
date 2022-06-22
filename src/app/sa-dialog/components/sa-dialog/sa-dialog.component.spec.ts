import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaDialogComponent } from './sa-dialog.component';

describe('SaDialogComponent', () => {
  let component: SaDialogComponent;
  let fixture: ComponentFixture<SaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
