import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PtwDetailsRoutingModule } from './ptw-details-routing.module';
import { PtwDetailsComponent } from './components/ptw-details/ptw-details.component';
import { TerminateDialogComponent } from '../terminate-dialog/components/terminate-dialog/terminate-dialog.component';

@NgModule({
  declarations: [
    PtwDetailsComponent,
    TerminateDialogComponent
  ],
  imports: [
    CommonModule,
    PtwDetailsRoutingModule,
    SharedModule
  ]
})
export class PtwDetailsModule { }
