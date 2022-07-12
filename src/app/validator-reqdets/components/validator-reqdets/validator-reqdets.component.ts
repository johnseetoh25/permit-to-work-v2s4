import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { SaDialogComponent } from 'src/app/sa-dialog/components/sa-dialog/sa-dialog.component';
import { AmDialogComponent } from 'src/app/am-dialog/components/am-dialog/am-dialog.component';
import { DbService } from 'src/app/services/db.service';
import { TerminateDialogComponent } from 'src/app/terminate-dialog/components/terminate-dialog/terminate-dialog.component';
import { CancelDialogComponent } from 'src/app/cancel-dialog/components/cancel-dialog/cancel-dialog.component';
import { Subscription } from 'rxjs';
import { CompShareService } from 'src/app/services/comp-share.service';

@Component({
  selector: 'app-validator-reqdets',
  templateUrl: './validator-reqdets.component.html',
  styleUrls: ['./validator-reqdets.component.scss']
})
export class ValidatorReqdetsComponent implements OnInit {
  public targetPtw!: IPermitToWork[];
  
  public submissionTimestampDisplay: Date = new Date();
  public cancelReqTimestampDisplay: Date = new Date();
  public cancelledTimestampDisplay: Date = new Date();
  public termReqTimestampDisplay: Date = new Date();
  public closedTimestampDisplay: Date = new Date();
  public evaluatedTimestampDisplay: Date = new Date();
  public authorisedTimestampDisplay: Date = new Date();

  private clickEventSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetched: any,
    private dialog: MatDialog,
    private dialogRefSa: MatDialogRef<SaDialogComponent>,
    private dialogRefAm: MatDialogRef<AmDialogComponent>,
    private dialogRefCancel: MatDialogRef<CancelDialogComponent>,
    private dialogRefTerminate: MatDialogRef<TerminateDialogComponent>,
    private compShare: CompShareService,
    private db: DbService
  ) {
    this.refresh();
    this.clickEventSub = this.compShare.getClickEvent().subscribe(() => {
      this.refresh();
    });
  }

  public ngOnInit(): void { }

  public refresh(): void {
    this.db.fetchWith("id", this.fetched.id.toString()).subscribe((data: IPermitToWork[]) => {
      this.targetPtw = data;
      this.submissionTimestampDisplay = new Date(this.targetPtw[0].timestamp);
      if (this.targetPtw[0].reqCancTimestamp != DefaultValues.VALUE_NONE) {
        this.cancelReqTimestampDisplay = new Date(this.targetPtw[0].reqCancTimestamp);
      }
      if (this.targetPtw[0].ptwStatus.reqTermTimestamp != DefaultValues.VALUE_NONE) {
        this.termReqTimestampDisplay = new Date(this.targetPtw[0].ptwStatus.reqTermTimestamp);
      }
      if (this.targetPtw[0].cancelledTimestamp != DefaultValues.VALUE_NONE) {
        this.cancelledTimestampDisplay = new Date(this.targetPtw[0].cancelledTimestamp);
      }
      if (this.targetPtw[0].ptwStatus.terminatedTimestamp != DefaultValues.VALUE_NONE) {
        this.closedTimestampDisplay = new Date(this.targetPtw[0].ptwStatus.terminatedTimestamp);
      }
      if (this.targetPtw[0].safetyAssessorEvaluation.timestamp != DefaultValues.VALUE_NONE) {
        this.evaluatedTimestampDisplay = new Date(this.targetPtw[0].safetyAssessorEvaluation.timestamp);
      }
      if (this.targetPtw[0].authorisedManagerApproval.timestamp != DefaultValues.VALUE_NONE) {
        this.authorisedTimestampDisplay = new Date(this.targetPtw[0].authorisedManagerApproval.timestamp);
      }
    });
  }

  public openSafetyAssessorDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ptw: this.targetPtw,
      userName: this.fetched.userName
    }
    this.dialogRefSa = this.dialog.open(SaDialogComponent, dialogConfig);
  }

  public openAuthorisedManagerDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ptw: this.targetPtw,
      userName: this.fetched.userName
    }
    this.dialogRefAm = this.dialog.open(AmDialogComponent, dialogConfig);
  }

  public openCancelDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.targetPtw;
    this.dialogRefCancel = this.dialog.open(CancelDialogComponent, dialogConfig);
  }

  public openTerminateDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.targetPtw;
    this.dialogRefTerminate = this.dialog.open(TerminateDialogComponent, dialogConfig);
  }
}
