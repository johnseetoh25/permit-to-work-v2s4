import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CancelDialogRoutingModule } from './cancel-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CancelDialogRoutingModule,
    SharedModule
  ]
})
export class CancelDialogModule { }
