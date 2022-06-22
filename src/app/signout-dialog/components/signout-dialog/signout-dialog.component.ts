import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signout-dialogue',
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss']
})
export class SignoutDialogComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public ngOnInit(): void { }

  public signOut() : void {
    this.auth.signOut();
  }
}
