import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignoutDialogComponent } from 'src/app/signout-dialog/components/signout-dialog/signout-dialog.component';
import { DbService } from 'src/app/services/db.service';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';

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

  public invalidPermitNo: number = 0;
  public validPermitNo: number = 0;
  public expiredPermitNo: number = 0;
  public terminatedPermitNo: number = 0;
  public closedPermitNo: number = 0;

  public pendingReqList: IPermitToWork[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private db: DbService,
    public dialog: MatDialog, 
    public dialogRefSignOut: MatDialogRef<SignoutDialogComponent>) { }

  public ngOnInit(): void { 
    this.checkSession();
    this.allocatePermitQueryRes();
  }

  public allocatePermitQueryRes(): void {
    this.db.returnInvalidPermits().subscribe((resp: IPermitToWork[]) => {
      this.invalidPermitNo = resp.length;
    });

    this.db.returnValidPermits().subscribe((resp: IPermitToWork[]) => {
      this.validPermitNo = resp.length;
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
      } else {
        console.log("Currently signed in validator: None");
        this.router.navigate(['validator-sign-in'], { replaceUrl: true });
      }
    });
  }

  public openSignOutDialog() : void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }
}