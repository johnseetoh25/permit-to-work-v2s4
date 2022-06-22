import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AmDialogRoutingModule } from './am-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AmDialogRoutingModule,
    SharedModule
  ]
})
export class AmDialogModule { }
