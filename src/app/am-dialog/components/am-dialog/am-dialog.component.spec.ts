import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmDialogComponent } from './am-dialog.component';

describe('AmDialogComponent', () => {
  let component: AmDialogComponent;
  let fixture: ComponentFixture<AmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
