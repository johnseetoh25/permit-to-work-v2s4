import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  private validatorsUrl: string = "https://db-ptw-sys-2.herokuapp.com/validators";
  //private validatorsUrl: string = "/db/validators";
  public currentUser: User = {
    id: 0,
    userId: "",
    userPw: "",
    userName: "",
    inSession: false
  };

  public signingIn: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  public checkSession(state: boolean): Observable<User[]> {
    return this.http.get<User[]>(this.validatorsUrl + "?inSession=" + state.toString());
  }

  public setSession(state: boolean, user: User): void {
    const headers = { 
      'content-type': 'application/json' 
    };

    switch (state) {
      case true:
        this.http.put(this.validatorsUrl + "/" + user.id, {
          userId: user.userId,
          userPw: user.userPw,
          userName: user.userName,
          inSession: state
        }, { "headers": headers }).subscribe((resp: any) => {
          console.log(resp.userName, "has signed in!");
        });

        break;
      
      case false:
        this.http.put(this.validatorsUrl + "/" + user.id, {
          userId: user.userId,
          userPw: user.userPw,
          userName: user.userName,
          inSession: state
        }, { "headers": headers }).subscribe((resp: any) => {
          console.log(resp.userName, "has signed out!");
        });

        break;
    }
  }

  public signIn(userId: string, userPw: string): void {
    this.signingIn = true;

    var response = this.http.get<User[]>(this.validatorsUrl + "?userId=" + userId.toString());
    response.subscribe(
      (res: User[]) => {
        if (res[0] == null) {
          this.signingIn = false;
          this.openSnackBar("User does not exist. Please try again.", "", 3000);
        } else {
          if (res[0].userPw == userPw) {
            if (!res[0].inSession) {
              this.openSnackBar("Signed in successfully as validator.", "", 3000);
              this.router.navigate(['dashboard'], { queryParams: { userId: res[0].userId }, replaceUrl: true });
            } else {
              this.router.navigate([], { queryParams: { userId: res[0].userId }, replaceUrl: true });
            }
            this.signingIn = false;

            this.currentUser = res[0];
            this.setSession(true, this.currentUser);
          } else {
            this.signingIn = false;
            this.openSnackBar("Password does not match. Please try again.", "", 3000);
          }
        }
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("Sign-in operation completed.");
      });
  }

  public signOut(): void {
    this.router.navigate(["landing"], { replaceUrl: true }).then(() => {
      this.setSession(false, this.currentUser);
      this.openSnackBar("You have been successfully signed out.", "", 3000);
    }).finally(() => {
      this.dialog.closeAll();
    });
  }
  
  public openSnackBar(msg: string, action: string, duration: number): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }
}