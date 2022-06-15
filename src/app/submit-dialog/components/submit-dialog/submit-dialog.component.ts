import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent implements OnInit {
  private ptwReqToSubmit: IPermitToWork | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedPartiallyCompletedPTWForm: IPermitToWork | undefined
  ) { }

  public ngOnInit(): void { }

  public submitApplication(): void {
    this.injectedPartiallyCompletedPTWForm!.timestamp = new Date();
    this.injectedPartiallyCompletedPTWForm!.workAtHeight!.sectionOne!.timestamp = new Date();
    this.injectedPartiallyCompletedPTWForm!.ptwId = "PTW-" + this.injectedPartiallyCompletedPTWForm!.id?.toString().padStart(3, "0");

    this.ptwReqToSubmit = this.injectedPartiallyCompletedPTWForm;
    this.postPtwReq(this.ptwReqToSubmit);
    console.log(this.ptwReqToSubmit);
  }

  public postPtwReq(toSubmit: IPermitToWork | undefined): void {
    //...
  }

  public openSnackBar(msg: string, action: string): void { }
}