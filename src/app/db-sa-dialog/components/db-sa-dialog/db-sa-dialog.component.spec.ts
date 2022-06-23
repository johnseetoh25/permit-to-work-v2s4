import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSaDialogComponent } from './db-sa-dialog.component';

describe('DbSaDialogComponent', () => {
  let component: DbSaDialogComponent;
  let fixture: ComponentFixture<DbSaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbSaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbSaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
