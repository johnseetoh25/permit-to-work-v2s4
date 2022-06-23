import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DbAmDialogRoutingModule } from './db-am-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DbAmDialogRoutingModule,
    SharedModule
  ]
})
export class DbAmDialogModule { }
