import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { SaDialogComponent } from 'src/app/sa-dialog/components/sa-dialog/sa-dialog.component';
import { AmDialogComponent } from 'src/app/am-dialog/components/am-dialog/am-dialog.component';
import { DbService } from 'src/app/services/db.service';
import { DbSaDialogComponent } from 'src/app/db-sa-dialog/components/db-sa-dialog/db-sa-dialog.component';
import { DbAmDialogComponent } from 'src/app/db-am-dialog/components/db-am-dialog/db-am-dialog.component';

@Component({
  selector: 'app-validator-reqdets',
  templateUrl: './validator-reqdets.component.html',
  styleUrls: ['./validator-reqdets.component.scss']
})
export class ValidatorReqdetsComponent implements OnInit {
  public targetPtw!: IPermitToWork[];
  
  public submissionTimestampDisplay: Date = new Date();
  public cancellationTimestampDisplay: Date = new Date();
  public evaluatedTimestampDisplay: Date = new Date();
  public authorisedTimestampDisplay: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetched: any,
    private dialog: MatDialog,
    private dialogRefSa: MatDialogRef<SaDialogComponent>,
    private dialogRefAm: MatDialogRef<AmDialogComponent>,
    private dialogRefDbSa: MatDialogRef<DbSaDialogComponent>,
    private dialogRefDbAm: MatDialogRef<DbAmDialogComponent>,
    private db: DbService
  ) {
    this.db.fetchWith(this.fetched.id).subscribe((data: IPermitToWork[]) => {
      this.targetPtw = data;
      this.submissionTimestampDisplay = new Date(this.targetPtw[0].timestamp);
      if (this.targetPtw[0].ptwStatus.timestamp != DefaultValues.VALUE_NONE) {
        this.cancellationTimestampDisplay = new Date(this.targetPtw[0].ptwStatus.timestamp);
      }
      if (this.targetPtw[0].safetyAssessorEvaluation.timestamp != DefaultValues.VALUE_NONE) {
        this.evaluatedTimestampDisplay = new Date(this.targetPtw[0].safetyAssessorEvaluation.timestamp);
      }
      if (this.targetPtw[0].authorisedManagerApproval.timestamp != DefaultValues.VALUE_NONE) {
        this.authorisedTimestampDisplay = new Date(this.targetPtw[0].authorisedManagerApproval.timestamp);
      }
    });
  }

  public ngOnInit(): void { }

  public openSafetyAssessorDialog(type: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ptw: this.targetPtw,
      userName: this.fetched.userName
    }

    switch (type) {
      case "dashboard":
        this.dialogRefDbSa = this.dialog.open(DbSaDialogComponent, dialogConfig);
        break;
      case "tl":
        this.dialogRefSa = this.dialog.open(SaDialogComponent, dialogConfig);
        break;
    }
  }

  public openAuthorisedManagerDialog(type: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ptw: this.targetPtw,
      userName: this.fetched.userName
    }

    switch (type) {
      case "dashboard":
        this.dialogRefDbAm = this.dialog.open(DbAmDialogComponent, dialogConfig);
        break;
      case "tl":
        this.dialogRefAm = this.dialog.open(AmDialogComponent, dialogConfig);
        break;
    }
  }
}
