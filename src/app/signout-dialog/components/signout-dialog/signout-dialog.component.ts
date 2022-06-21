import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signout-dialogue',
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss']
})
export class SignoutDialogComponent implements OnInit {

  constructor(private router : Router,
              private msgService : MessageService,
              private dialog : MatDialog) { }

  public ngOnInit(): void { }

  public signOut() : void {
    this.router.navigate(["landing"], { replaceUrl: true }).then(() => {
      this.openSnackBar("Signed out!", "OK");
    }).finally(() => {
      this.dialog.closeAll();
    });
  }

  public openSnackBar(msg : string, action : string) : void {
    this.msgService.openSnackBar(msg, action);
  }
}
