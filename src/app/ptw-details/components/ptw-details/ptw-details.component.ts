import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogConfig, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from "@angular/material/dialog";
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
// Put cancel dialog import here.

@Component({
  selector: 'app-ptw-details',
  templateUrl: './ptw-details.component.html',
  styleUrls: ['./ptw-details.component.scss']
})
export class PtwDetailsComponent implements OnInit {
  public targetPtw!: IPermitToWork[];

  public submissionTimestampDisplay: Date | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetchedId: any,
    private db: DbService,
  ) { 
    this.db.fetchWith(this.fetchedId).subscribe((data: IPermitToWork[]) => {
      this.targetPtw = data;
      this.submissionTimestampDisplay = new Date(this.targetPtw[0].timestamp || '');
    });
  }

  public ngOnInit(): void { }

  public openTerminateDialog(): void { }
}