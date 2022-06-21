import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TerminateDialogRoutingModule } from './terminate-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TerminateDialogRoutingModule,
    SharedModule
  ]
})
export class TerminateDialogModule { }
