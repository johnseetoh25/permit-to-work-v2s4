import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validator-sign-in',
  templateUrl: './validator-sign-in.component.html',
  styleUrls: ['./validator-sign-in.component.scss']
})
export class ValidatorSignInComponent implements OnInit {
  public validatorSignInFormGroup!: FormGroup;
    public userIdInput: string = "";
    public userPwInput: string = "";

  public submitted: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              public auth: AuthService) { }

  public ngOnInit(): void {
    this.validatorSignInFormGroup = this._formBuilder.group({
      userId: ['', Validators.required],
      userPw: ['', Validators.required]
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

    this.auth.signIn(this.userIdInput, this.userPwInput, AuthService.UserTypes.USER_VALIDATOR);
  }

  public navigateTo(url: string) : void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}