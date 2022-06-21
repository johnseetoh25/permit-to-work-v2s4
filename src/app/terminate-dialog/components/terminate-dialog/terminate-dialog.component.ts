import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { TaskStatus } from 'src/app/constants/TaskStatus';
import { PermitStatus } from 'src/app/constants/PermitStatus';

@Component({
  selector: 'app-terminate-dialog',
  templateUrl: './terminate-dialog.component.html',
  styleUrls: ['./terminate-dialog.component.scss']
})
export class TerminateDialogComponent implements OnInit {
  public ptwToTerminate!: IPermitToWork[];

  public reasonsForTermination: string[] = [
    TaskStatus.STATUS_COMPLETED,
    TaskStatus.STATUS_OVERTIME,
    TaskStatus.STATUS_SUSPENDED
  ];

  public permitStatusRes: string[] = [
    PermitStatus.STATUS_TERMINATED,
    PermitStatus.STATUS_EXPIRED
  ]

  public selectedReason: string = "";
  public taskStatusRemarksInput: string = "";
  public typeToConfirmInput: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public targetPtw: any,
    private db: DbService
  ) { }

  public ngOnInit(): void { }

  public terminatePtw(): void { }
}