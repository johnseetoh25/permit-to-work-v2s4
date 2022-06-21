import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ValidatorSignInRoutingModule } from './validator-sign-in-routing.module';
import { ValidatorSignInComponent } from './components/validator-sign-in/validator-sign-in.component';

@NgModule({
  declarations: [
    ValidatorSignInComponent
  ],
  imports: [
    CommonModule,
    ValidatorSignInRoutingModule,
    SharedModule
  ]
})
export class ValidatorSignInModule { }