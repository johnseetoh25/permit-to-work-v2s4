import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { TerminateDialogComponent } from 'src/app/terminate-dialog/components/terminate-dialog/terminate-dialog.component';

@Component({
  selector: 'app-ptw-details',
  templateUrl: './ptw-details.component.html',
  styleUrls: ['./ptw-details.component.scss']
})
export class PtwDetailsComponent implements OnInit {
  public targetPtw!: IPermitToWork[];
  
  public submissionTimestampDisplay: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetchedId: any,
    private dialog: MatDialog,
    private dialogRefTerminate: MatDialogRef<TerminateDialogComponent>,
    private db: DbService,
  ) { 
    this.db.fetchWith(this.fetchedId).subscribe((data: IPermitToWork[]) => {
      this.targetPtw = data;
      this.submissionTimestampDisplay = new Date(this.targetPtw[0].timestamp);
    });
  }

  public ngOnInit(): void { }

  public openTerminateDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.targetPtw;
    console.log(this.targetPtw);
    this.dialogRefTerminate = this.dialog.open(TerminateDialogComponent, dialogConfig);
  }
}