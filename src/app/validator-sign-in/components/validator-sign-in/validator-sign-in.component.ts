// ==============================================================================================================================================================================

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/User';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CompShareService } from 'src/app/services/comp-share.service';
import { DefaultValues } from 'src/app/constants/DefaultValues';

// ==============================================================================================================================================================================

@Component({
  selector: 'app-validator-sign-in',
  templateUrl: './validator-sign-in.component.html',
  styleUrls: ['./validator-sign-in.component.scss']
})

// ==============================================================================================================================================================================

export class ValidatorSignInComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Snackbar position variables.)
  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // * (Form control variables for validator sign-in.)
  public validatorSignInFormGroup!: FormGroup;
    public userIdInput: string = "";
    public userPwInput: string = "";

  // * (Check whether if the form is being submitted.)
  public formSubmitted: boolean = false;

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(public auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private compShare: CompShareService,) { }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void {
    // * (Check current login session.)
    this.checkSession();

    // * (Setup the sign-in form.)
    this.validatorSignInFormGroup = this.formBuilder.group({
      userId: ['', Validators.required],
      userPw: ['', Validators.required],
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Check if there is any existing login session in this page. If yes, redirect user to
  // Dashboard page i.e.: inSession = true. Else, remain on this page. This checks and 
  // manipulates the JSON fields in the server.)
  public checkSession(): void {
    this.auth.checkSession(true).subscribe((signedInCallback: User[]) => { 
      if (signedInCallback[0]?.userId != null) {
        this.auth.signIn(signedInCallback[0].userId, signedInCallback[0].userPw);
        this.navigateTo("dashboard");

        // * (Send an event signal to convert home title's onclick function as sign out func
        // instead of normal router func.)
        this.compShare.sendHomeTitleAsSignOutEvent();

        this.openSnackBar("Auto signed in as previous validator, " + signedInCallback[0].userName + " (" + signedInCallback[0].userId + ").", "", 3500);
        console.log("Currently signed in validator:", signedInCallback[0].userId);
      } else {
        console.log("Currently signed in validator: ", DefaultValues.VALUE_NONE);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Function callback when "Sign-in" button is pressed, prompting sign-in.)
  public onSubmit(): void {
    this.formSubmitted = true;

    if (this.validatorSignInFormGroup.invalid) {
      return;
    }

    this.auth.signIn(this.userIdInput, this.userPwInput);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Router navigation without history tracebacks.)
  public navigateTo(url: string) : void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Self-expiring toast message box after an action is performed.)
  public openSnackBar(msg: string, action: string, duration: number): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// ==============================================================================================================================================================================