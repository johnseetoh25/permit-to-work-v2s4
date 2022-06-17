import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent implements OnInit {
  private ptwReqToSubmit: IPermitToWork | undefined;

  constructor(
    private dialogRefSelf: MatDialogRef<SubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedPartiallyCompletedPTWForm: IPermitToWork | undefined,
    private db: DbService,
    private msg: MessageService,
    private router: Router
  ) { }

  public ngOnInit(): void { }

  public submitApplication(): void {
    this.injectedPartiallyCompletedPTWForm!.timestamp = new Date().toISOString();
    this.injectedPartiallyCompletedPTWForm!.workAtHeight!.sectionOne!.timestamp = new Date().toISOString();
    this.injectedPartiallyCompletedPTWForm!.ptwId = "PTW-" + this.injectedPartiallyCompletedPTWForm!.id?.toString().padStart(3, "0");

    this.ptwReqToSubmit = this.injectedPartiallyCompletedPTWForm;
    this.postPtwReq(this.ptwReqToSubmit);
    console.log(this.ptwReqToSubmit);
  }

  public postPtwReq(toSubmit: IPermitToWork | undefined): void {
    this.db.post(toSubmit)
      .subscribe((data : IPermitToWork | undefined) => {
        console.log(data);
        this.dialogRefSelf.close();
        this.dialogRefSelf.afterClosed().subscribe(() => {
          this.navigateTo("");
          this.openSnackBar("A new PTW request has been made!", "OK");
        });
    });
  }

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}