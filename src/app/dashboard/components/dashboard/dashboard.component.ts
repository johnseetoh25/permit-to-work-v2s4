import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignoutDialogComponent } from 'src/app/signout-dialog/components/signout-dialog/signout-dialog.component';
import { DbService } from 'src/app/services/db.service';
import { MessageService } from 'src/app/services/message.service';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { ValidatorReqdetsComponent } from 'src/app/validator-reqdets/components/validator-reqdets/validator-reqdets.component';
import { CompShareService } from 'src/app/services/comp-share.service';
import { Subscription } from 'rxjs';
import { PermitStatus } from 'src/app/constants/PermitStatus';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class DashboardComponent implements OnInit {
  public userNameDisplay: string = "";

  public processingPermitNo: number = 0;
  public validPermitNo: number = 0;
  public invalidPermitNo: number = 0;
  public expiredPermitNo: number = 0;
  public terminatedPermitNo: number = 0;
  public closedPermitNo: number = 0;
  public cancReqsNo: number = 0;
  public termReqsNo: number = 0;

  public pendingReqList: IPermitToWork[] = [];

  private clickEventSub: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private db: DbService,
    public dialog: MatDialog, 
    public dialogRefSignOut: MatDialogRef<SignoutDialogComponent>,
    public dialogRefVldReqDets: MatDialogRef<ValidatorReqdetsComponent>,
    private msg: MessageService,
    private compShare: CompShareService
  ) {
    this.clickEventSub = this.compShare.getClickEvent().subscribe(() => {
      this.allocatePermitQueryRes();
    });
  }

  public ngOnInit(): void { 
    this.checkSession();
    this.allocatePermitQueryRes();
  }

  public allocatePermitQueryRes(): void {
    this.db.returnProcessingPermits().subscribe((resp: IPermitToWork[]) => {
      this.processingPermitNo = resp.length;
    });

    this.db.returnValidPermits().subscribe((resp: IPermitToWork[]) => {
      this.validPermitNo = resp.length;
    });

    this.db.returnInvalidPermits().subscribe((resp: IPermitToWork[]) => {
      this.invalidPermitNo = resp.length;
    });

    this.db.returnExpiredPermits().subscribe((resp: IPermitToWork[]) => {
      this.expiredPermitNo = resp.length;
    });

    this.db.returnTerminatedPermits().subscribe((resp: IPermitToWork[]) => {
      this.terminatedPermitNo = resp.length;
    });

    this.db.returnClosedPermits().subscribe((resp: IPermitToWork[]) => {
      this.closedPermitNo = resp.length;
    });

    this.db.returnPendingReqs().subscribe((resp: IPermitToWork[]) => {
      this.pendingReqList = resp;
      this.pendingReqList.sort((a, b) => 
        (a.ptwId.substring(4, 10).valueOf() > b.ptwId.substring(4, 10).valueOf())? -1 : 1
      );
    });

    this.db.returnCancReqs().subscribe((resp: IPermitToWork[]) => {
      this.cancReqsNo = resp.length;
    });

    this.db.returnTermReqs().subscribe((resp: IPermitToWork[]) => {
      this.termReqsNo = resp.length;
    });
  }

  public navigateTo(url : string) : void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  public checkSession(): void {
    this.auth.checkSession(true).subscribe((resp: User[]) => { 
      if (resp[0]?.userId != null) {
        console.log("Currently signed in validator:", resp[0].userId);
        this.auth.signIn(resp[0].userId, resp[0].userPw);
        this.userNameDisplay = resp[0].userName + " (" + resp[0].userId + ")";
        this.compShare.sendHomeTitleAsSignOutEvent();
      } else {
        console.log("Currently signed in validator: None");
        this.router.navigate(['validator-sign-in'], { replaceUrl: true });
      }
    });
  }

  public async expandSelectedPtw(id: string): Promise<void> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id,
      userName: this.userNameDisplay,
      from: "dashboard"
    };
    this.dialogRefVldReqDets = this.dialog.open(ValidatorReqdetsComponent, dialogConfig);
  }

  public openSignOutDialog() : void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }
}