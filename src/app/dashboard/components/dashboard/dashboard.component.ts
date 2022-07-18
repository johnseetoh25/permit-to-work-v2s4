// ==============================================================================================================================================================================

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

// ==============================================================================================================================================================================

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: { }
    }
  ]
})

// ==============================================================================================================================================================================

export class DashboardComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Validator user name variable to be displayed in the page.)
  public userNameDisplay: string = "";

  // * (No. of permit currently being processed, i.e.: permitStatus = Processing.)
  public processingPermitNo: number = 0;

  // * (No. of permit currently being valid, i.e.: permitStatus = Valid.)
  public validPermitNo: number = 0;

  // * (No. of permit currently being invalid, i.e.: permitStatus = ---.)
  public invalidPermitNo: number = 0;

  // * (No. of permit currently being expired, i.e.: permitStatus = Expired.)
  public expiredPermitNo: number = 0;

  // * (No. of permit currently being terminated, i.e.: permitStatus = Terminated.)
  public terminatedPermitNo: number = 0;

  // * (No. of permit currently being closed, i.e.: permitStatus = Closed.)
  public closedPermitNo: number = 0;

  // * (No. of cancellation being requested, i.e.: isCancReq = true.)
  public cancReqsNo: number = 0;

  // * (No. of closure/termination being requested, i.e.: isTermReq = true.)
  public termReqsNo: number = 0;

  // * (Empty pending request array list.)
  public pendingReqList: IPermitToWork[] = [];

  // * (Click event subscription for any callback from the emitter.)
  private clickEventSub: Subscription = new Subscription;

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    // * (Subscribe to detect any click event that triggers changes in UI, then do 
    // something afterwards.)
    this.clickEventSub = this.compShare.getClickEvent().subscribe(() => {
      this.allocateQueryResults();
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void {
    // * (Check current login session.)
    this.checkSession();
    // * (Gather all fetched query results, extract their subscribed arrays, and convert them into
    // numbers to be displayed at the dashboard itself.)
    this.allocateQueryResults();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Gather all fetched query results, extract their subscribed arrays, and convert them into
  // numbers to be displayed at the dashboard itself.)
  public allocateQueryResults(): void {
    // * (Return no. of permit currently being processed.)
    this.db.returnProcessingPermits().subscribe((result: IPermitToWork[]) => {
      this.processingPermitNo = result.length;
    });

    // * (Return no. of permit currently being valid.)
    this.db.returnValidPermits().subscribe((result: IPermitToWork[]) => {
      this.validPermitNo = result.length;
    });

    // * (Return no. of permit currently being invalid.)
    this.db.returnInvalidPermits().subscribe((result: IPermitToWork[]) => {
      this.invalidPermitNo = result.length;
    });

    // * (Return no. of permit currently being expired.)
    this.db.returnExpiredPermits().subscribe((result: IPermitToWork[]) => {
      this.expiredPermitNo = result.length;
    });

    // * (Return no. of permit currently being terminated.)
    this.db.returnTerminatedPermits().subscribe((result: IPermitToWork[]) => {
      this.terminatedPermitNo = result.length;
    });

    // * (Return no. of permit currently being closed.)
    this.db.returnClosedPermits().subscribe((result: IPermitToWork[]) => {
      this.closedPermitNo = result.length;
    });

    // * (Return no. of pending permit requests.)
    this.db.returnPendingReqs().subscribe((result: IPermitToWork[]) => {
      this.pendingReqList = result;
      // * (Sort the pending request array list items in alphabetically descending order.)
      this.pendingReqList.sort((a, b) => 
        (a.ptwId.substring(4, 10).valueOf() > b.ptwId.substring(4, 10).valueOf())? -1 : 1
      );
    });

    // * (Return no. of cancellation requests.)
    this.db.returnCancReqs().subscribe((result: IPermitToWork[]) => {
      this.cancReqsNo = result.length;
    });

    // * (Return no. of closure/termination requests.)
    this.db.returnTermReqs().subscribe((result: IPermitToWork[]) => {
      this.termReqsNo = result.length;
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Router navigation without history tracebacks.)
  public navigateTo(url : string) : void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Check if there is any existing login session in this page. If yes,
  // remain on the same page i.e.: inSession = true. Else, redirect user 
  // to sign-in page.)
  public checkSession(): void {
    this.auth.checkSession(true).subscribe((signedInCallback: User[]) => { 
      if (signedInCallback[0]?.userId != null) {
        this.auth.signIn(signedInCallback[0].userId, signedInCallback[0].userPw);
        this.userNameDisplay = signedInCallback[0].userName + " (" + signedInCallback[0].userId + ")";
        
        // * (Send an event signal to convert home title's onclick function as sign out func
        // instead of normal router func.)
        this.compShare.sendHomeTitleAsSignOutEvent();

        console.log("Currently signed in validator:", signedInCallback[0].userId);
      } else {
        console.log("Currently signed in validator: None");
        this.navigateTo("validator-sign-in");
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open a selected permit to expand its details and further actions.)
  public async expandSelectedPtw(id: string): Promise<void> {
    const dialogConfig = new MatDialogConfig();
    // * (Send id and username value to the dialog to open specific permit 
    // details by id.)
    dialogConfig.data = {
      id: id,
      userName: this.userNameDisplay,
    };
    // * (Open the dialog with injected data - id, username.)
    this.dialogRefVldReqDets = this.dialog.open(ValidatorReqdetsComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open sign-out dialog to sign-out user.)
  public openSignOutDialog() : void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Self-expiring toast message box after an action is performed.)
  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// ==============================================================================================================================================================================