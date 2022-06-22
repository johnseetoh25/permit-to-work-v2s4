import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignoutDialogComponent } from 'src/app/signout-dialog/components/signout-dialog/signout-dialog.component';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private msgService: MessageService,
    public dialog: MatDialog, 
    public dialogRefSignOut: MatDialogRef<SignoutDialogComponent>) { }

  public ngOnInit(): void { 
    this.checkSession(); 
    //this.userNameDisplay = this.auth.currentUser.userName;
  }

  public navigateTo(url : string) : void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  public checkSession(): void {
    this.auth.checkSession(true).subscribe((resp: User[]) => { 
      if (resp[0]?.userId != null) {
        console.log("Currently signed in validator:", resp[0].userId);
        this.auth.signIn(resp[0].userId, resp[0].userPw);
        this.userNameDisplay = resp[0].userName;
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