import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/User';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CompShareService } from 'src/app/services/comp-share.service';


@Component({
  selector: 'app-validator-sign-in',
  templateUrl: './validator-sign-in.component.html',
  styleUrls: ['./validator-sign-in.component.scss']
})
export class ValidatorSignInComponent implements OnInit {


  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public validatorSignInFormGroup!: FormGroup;
    public userIdInput: string = "";
    public userPwInput: string = "";

  public submitted: boolean = false;


  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              public auth: AuthService,
              private snackBar: MatSnackBar,
              private compShare: CompShareService) { }


  public ngOnInit(): void {
    this.checkSession();
    this.validatorSignInFormGroup = this._formBuilder.group({
      userId: ['', Validators.required],
      userPw: ['', Validators.required]
    });
  }


  public checkSession(): void {
    this.auth.checkSession(true).subscribe((resp: User[]) => { 
      if (resp[0]?.userId != null) {
        console.log("Currently signed in validator:", resp[0].userId);
        this.auth.signIn(resp[0].userId, resp[0].userPw);
        this.router.navigate(['dashboard'], { replaceUrl: true });
        this.openSnackBar("Auto signed in as previous validator, " + resp[0].userName + " (" + resp[0].userId + ").", "", 3500);
        this.compShare.sendHomeTitleAsSignOutEvent();
      } else {
        console.log("Currently signed in validator: None");
      }
    });
  }


  get f() { 
    return this.validatorSignInFormGroup.controls; 
  }


  public onSubmit(): void {
    this.submitted = true;
    if (this.validatorSignInFormGroup.invalid) {
      return;
    }
    this.auth.signIn(this.userIdInput, this.userPwInput);
  }


  public navigateTo(url: string) : void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }


  public openSnackBar(msg: string, action: string, duration: number): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }


}