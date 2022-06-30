import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignoutDialogComponent } from './signout-dialog/components/signout-dialog/signout-dialog.component';
import { CompShareService } from 'src/app/services/comp-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class AppComponent {
  public title: string = 'permit-to-work-v2s1';
  public toolbarLogo: string = "assets/images/temasek_polytechnic_logo.png";
  public logoAlt: string = "Temasek Polytechnic";

  public homeTitleAsSignOut: boolean = false;

  private homeTitleAsSignOutSub: Subscription;
  private homeTitleAsNavSub: Subscription;

  constructor(
    public router: Router,
    public dialog : MatDialog, 
    public dialogRefSignOut : MatDialogRef<SignoutDialogComponent>,
    private compShare: CompShareService
    ) {
      this.homeTitleAsSignOutSub = this.compShare.getHomeTitleAsSignOutEvent().subscribe(() => {
        this.homeTitleAsSignOut = true;
      });
      
      this.homeTitleAsNavSub = this.compShare.getHomeTitleAsNavEvent().subscribe(() => {
        this.homeTitleAsSignOut = false;
      });
    }

  public openSignOutDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}