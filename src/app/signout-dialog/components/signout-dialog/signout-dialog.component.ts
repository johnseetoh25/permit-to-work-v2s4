import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CompShareService } from 'src/app/services/comp-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signout-dialogue',
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss']
})
export class SignoutDialogComponent implements OnInit {

  constructor(private auth: AuthService, private compShare: CompShareService) { }

  public ngOnInit(): void { }

  public signOut() : void {
    this.auth.signOut();
    this.compShare.sendHomeTitleAsNavEvent();
  }
}
