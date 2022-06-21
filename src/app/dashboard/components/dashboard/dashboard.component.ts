import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router : Router,
    private authService : AuthService,
    private msgService : MessageService,
    public dialog : MatDialog, 
    public dialogRef : MatDialogRef<SignoutDialogComponent>) { }

  public ngOnInit(): void { }

  public navigateTo(url : string) : void {
    this.router.navigate(["/" + url], { queryParams: { userId: this.authService.currentUser.userId }, replaceUrl: true });
  }

  public openSignOutDialogue() : void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  public openSnackBar(msg : string, action : string) : void {
    this.msgService.openSnackBar(msg, action);
  }
}