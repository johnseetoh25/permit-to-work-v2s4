import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PtwRequestRoutingModule } from './ptw-request-routing.module';
import { PtwRequestComponent } from './components/ptw-request/ptw-request.component';
import { SharedModule } from '../shared/shared.module';
import { SubmitDialogComponent } from '../submit-dialog/components/submit-dialog/submit-dialog.component';

@NgModule({
  declarations: [
    PtwRequestComponent,
    SubmitDialogComponent
  ],
  imports: [
    CommonModule,
    PtwRequestRoutingModule,
    SharedModule
  ]
})
export class PtwRequestModule { }