import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { SignoutDialogComponent } from './signout-dialog/components/signout-dialog/signout-dialog.component';

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

  constructor(
    public router: Router,
    private auth: AuthService,
    public dialog : MatDialog, 
    public dialogRefSignOut : MatDialogRef<SignoutDialogComponent>
    ) { }

  public openSignOutDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}