import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public static UserTypes = {
    USER_APPLICANT: 0,
    USER_VALIDATOR: 1
  }

  public horizontalPosition : MatSnackBarHorizontalPosition = 'start';
  public verticalPosition : MatSnackBarVerticalPosition = 'bottom';

  private userDataUrl : string = "/db/validators";
  public currentUser : User = {
    id: 0,
    userId: "",
    userPw: "",
    userName: "",
    inSession: false
  };

  public signingIn : boolean = false;
  public currentlySignedIn : boolean = false;

  constructor(private http: HttpClient, private router : Router, private snackBar: MatSnackBar) { }

  public signIn(userId : string, userPw : string, type : number) : void {
    this.signingIn = true;
    switch (type) {
      case AuthService.UserTypes.USER_APPLICANT:
        this.openSnackBar("Signed in successfully as applicant.", "OK");
        this.signingIn = false;
        this.router.navigate(['request-proposal'], { replaceUrl: true });
        break;
      
      case AuthService.UserTypes.USER_VALIDATOR:
        var response = this.http.get<User[]>(this.userDataUrl + "?userId=" + userId.toString());
        response.subscribe(
          (res : User[]) => {
            if (res[0] == null) {
              this.openSnackBar("User does not exist. Please try again.", "OK");
              this.signingIn = false;
            } else {
              if (res[0].userPw == userPw) {
                this.openSnackBar("Signed in successfully as validator.", "OK");
                this.currentUser = res[0];
                console.log(this.currentUser);
                this.currentlySignedIn = true;
                this.http.put(this.userDataUrl + "/" + this.currentUser.id + "/", {
                  id: this.currentUser.id,
                  userId: this.currentUser.userId,
                  userPw: this.currentUser.userPw,
                  userName: this.currentUser.userName,
                  inSession: this.currentlySignedIn
                }).subscribe(resp => { console.log(resp); }, err => { console.log(err); });
                this.signingIn = false;
                this.router.navigate(['dashboard'], {
                                      queryParams: {
                                        userId: this.currentUser.userId
                                      },
                                      replaceUrl: true
                                    });
              } else {
                this.openSnackBar("Password does not match. Please try again.", "OK");
                this.signingIn = false;
              }
            }
          },
          (err : any) => {
            console.log(err);
          },
          () => {
            console.log("Sign-in operation completed");
          });
        break;
    }
  }
  
  public openSnackBar(msg : string, action : string) : void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}