// ==============================================================================================================================================================================

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { ReqcancDialogComponent } from 'src/app/reqcanc-dialog/components/reqcanc-dialog/reqcanc-dialog.component';
import { ReqtermDialogComponent } from 'src/app/reqterm-dialog/components/reqterm-dialog/reqterm-dialog.component';
import { DbService } from 'src/app/services/db.service';
import { Subscription } from 'rxjs';
import { CompShareService } from 'src/app/services/comp-share.service';

// ==============================================================================================================================================================================

@Component({
  selector: 'app-ptw-details',
  templateUrl: './ptw-details.component.html',
  styleUrls: ['./ptw-details.component.scss']
})

// ==============================================================================================================================================================================

export class PtwDetailsComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  // * (Empty target permit array result selected from tracking-log.)
  public targetPtw: IPermitToWork[] = [];
  
  // * (Timestamps to be displayed conditionally in form of activity log.)
  public submissionTimestampDisplay: Date = new Date();
  public cancelReqTimestampDisplay: Date = new Date();
  public cancelledTimestampDisplay: Date = new Date();
  public termReqTimestampDisplay: Date = new Date();
  public closedTimestampDisplay: Date = new Date();
  public evaluatedTimestampDisplay: Date = new Date();
  public authorisedTimestampDisplay: Date = new Date();

  // * (Click event subscription for any callback from the emitter.)
  private clickEventSub: Subscription;

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetchedId: any,
    private dialog: MatDialog,
    private db: DbService,
    private compShare: CompShareService,
  ) { 
    // * (Subscribe to detect any click event that triggers changes in UI, then do 
    // something afterwards.)
    this.clickEventSub = this.compShare.getClickEvent().subscribe(() => {
      // * (Refresh and refetch permit data from the server, and load them back to 
      // the dialog.)
      this.refresh();
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void {
    this.refresh();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public refresh(): void {
    this.db.fetchWith("id", this.fetchedId.toString()).subscribe((data: IPermitToWork[]) => {
      this.targetPtw = data;

      this.submissionTimestampDisplay = new Date(this.targetPtw[0].timestamp);

      // * (If any timestamp value is still None, render it as "None" inside the dialog.)
      if (this.targetPtw[0].ptwStatus.terminatedTimestamp != DefaultValues.VALUE_NONE) {
        this.closedTimestampDisplay = new Date(this.targetPtw[0].ptwStatus.terminatedTimestamp);
      }
      if (this.targetPtw[0].reqCancTimestamp != DefaultValues.VALUE_NONE) {
        this.cancelReqTimestampDisplay = new Date(this.targetPtw[0].reqCancTimestamp);
      }
      if (this.targetPtw[0].cancelledTimestamp != DefaultValues.VALUE_NONE) {
        this.cancelledTimestampDisplay = new Date(this.targetPtw[0].cancelledTimestamp);
      }
      if (this.targetPtw[0].ptwStatus.reqTermTimestamp != DefaultValues.VALUE_NONE) {
        this.termReqTimestampDisplay = new Date(this.targetPtw[0].ptwStatus.reqTermTimestamp);
      }
      if (this.targetPtw[0].safetyAssessorEvaluation.timestamp != DefaultValues.VALUE_NONE) {
        this.evaluatedTimestampDisplay = new Date(this.targetPtw[0].safetyAssessorEvaluation.timestamp);
      }
      if (this.targetPtw[0].authorisedManagerApproval.timestamp != DefaultValues.VALUE_NONE) {
        this.authorisedTimestampDisplay = new Date(this.targetPtw[0].authorisedManagerApproval.timestamp);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open cancellation request dialog with additional data - ptw, userName.)
  public openRequestCancelDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ptw: this.targetPtw,
      userName: this.fetchedId.userName
    }
    this.dialog.open(ReqcancDialogComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open cloterm request dialog with additional data - ptw, userName.)
  public openRequestTerminateDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ptw: this.targetPtw,
      userName: this.fetchedId.userName
    }
    this.dialog.open(ReqtermDialogComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// ==============================================================================================================================================================================