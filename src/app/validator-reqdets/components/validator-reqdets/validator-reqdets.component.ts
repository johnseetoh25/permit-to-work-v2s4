import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { SaDialogComponent } from 'src/app/sa-dialog/components/sa-dialog/sa-dialog.component';
import { AmDialogComponent } from 'src/app/am-dialog/components/am-dialog/am-dialog.component';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-validator-reqdets',
  templateUrl: './validator-reqdets.component.html',
  styleUrls: ['./validator-reqdets.component.scss']
})
export class ValidatorReqdetsComponent implements OnInit {
  public targetPtw!: IPermitToWork[];
  
  public submissionTimestampDisplay: Date = new Date();
  public cancellationTimestampDisplay: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetchedId: any,
    private dialog: MatDialog,
    private dialogRefSa: MatDialogRef<SaDialogComponent>,
    private dialogRefAm: MatDialogRef<AmDialogComponent>,
    private db: DbService
  ) {
    this.db.fetchWith(this.fetchedId).subscribe((data: IPermitToWork[]) => {
      this.targetPtw = data;
      this.submissionTimestampDisplay = new Date(this.targetPtw[0].timestamp);
      if (this.targetPtw[0].ptwStatus.timestamp != DefaultValues.VALUE_NONE) {
        this.cancellationTimestampDisplay = new Date(this.targetPtw[0].ptwStatus.timestamp);
      }
    });
  }

  public ngOnInit(): void { }

  public openSafetyAssessorDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.targetPtw;
    this.dialogRefSa = this.dialog.open(SaDialogComponent, dialogConfig);
  }

  public openAuthorisedManagerDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.targetPtw;
    this.dialogRefAm = this.dialog.open(AmDialogComponent, dialogConfig);
  }
}
