import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DbSaDialogRoutingModule } from './db-sa-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DbSaDialogRoutingModule,
    SharedModule
  ]
})
export class DbSaDialogModule { }
