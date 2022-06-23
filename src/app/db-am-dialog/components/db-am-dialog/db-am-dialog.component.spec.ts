import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAmDialogComponent } from './db-am-dialog.component';

describe('DbAmDialogComponent', () => {
  let component: DbAmDialogComponent;
  let fixture: ComponentFixture<DbAmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbAmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
