import { Injectable } from '@angular/core';
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(msg: string, action: string, duration: number): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }
}