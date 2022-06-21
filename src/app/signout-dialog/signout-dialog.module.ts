import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignoutDialogRoutingModule } from './signout-dialog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignoutDialogRoutingModule,
    SharedModule
  ]
})
export class SignoutDialogueModule { }