import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SaDialogRoutingModule } from './sa-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SaDialogRoutingModule,
    SharedModule
  ]
})
export class SaDialogModule { }
