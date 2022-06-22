import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/interfaces/User';
import { PtwDetailsComponent } from 'src/app/ptw-details/components/ptw-details/ptw-details.component';
import { SignoutDialogComponent } from 'src/app/signout-dialog/components/signout-dialog/signout-dialog.component';

@Component({
  selector: 'app-validator-tl',
  templateUrl: './validator-tl.component.html',
  styleUrls: ['./validator-tl.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: { }
    }
  ]
})
export class ValidatorTlComponent implements OnInit {
  public displayedHeaderColumns: string[] = [
    'id',
    'ptwId',
    'locationOfWork',
    'subsectorLocation',
    'permitType',
    'startWorkingDateTime',
    'endWorkingDateTime',
    'applicantName',
    'submissionTimestamp',
    'requestStatus',
    'permitStatus',
    'action'
  ];

  public pageLength: number = 1000;
  public pageSize: number = 100;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  public sortedData: IPermitToWork[] = [];
  public activePageSortedData: IPermitToWork[] = [];

  public isRefreshing: boolean = false;

  constructor(
    private db: DbService,
    public dialog: MatDialog, 
    public dialogRefPtwDets: MatDialogRef<PtwDetailsComponent>,
    public dialogRefSignOut: MatDialogRef<SignoutDialogComponent>,
    private router: Router,
    private auth: AuthService,
    private msg: MessageService
  ) { }

  public ngOnInit(): void { 
    this.refresh();
    this.checkSession();
  }

  public checkSession(): void {
    this.auth.checkSession(true).subscribe((resp: User[]) => { 
      if (resp[0]?.userId != null) {
        console.log("Currently signed in validator:", resp[0].userId);
        this.auth.signIn(resp[0].userId, resp[0].userPw);
      } else {
        console.log("Currently signed in validator: None");
        this.router.navigate(['validator-sign-in'], { replaceUrl: true });
      }
    });
  }

  public refresh(): void {
    this.isRefreshing = true;
    this.db.fetch()
      .subscribe((data: IPermitToWork[]) => {
        console.log(data);
        this.db.openSnackBar("Loading / refreshing complete.", "");
        this.isRefreshing = false;
        this.sortedData = data;
        this.activePageSortedData = this.sortedData.slice(0, this.pageSize);
    });
  }

  public sort(sort: Sort) : any {
    const data = this.activePageSortedData.slice(0, this.pageSize);

    if (!sort.active || sort.direction === '') {
      this.activePageSortedData = data;
      return;
    }

    this.activePageSortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'ptwId':
          return this.compare(a.ptwId, b.ptwId, isAsc);
        case 'locationOfWork':
          return this.compare(a.locationOfWork?.main, b.locationOfWork?.main, isAsc);
        case 'subsectorLocation':
          return this.compare(a.locationOfWork?.sub, b.locationOfWork?.sub, isAsc);
        case 'permitType':
          return this.compare(a.permitType, b.permitType, isAsc);
        case 'startWorkingDateTime':
          return this.compare(a.startWorkingDateTime, b.startWorkingDateTime, isAsc);
        case 'endWorkingDateTime':
          return this.compare(a.endWorkingDateTime, b.endWorkingDateTime, isAsc);
        case 'applicantName':
          return this.compare(a.applicantDets?.name, b.applicantDets?.name, isAsc);
        case 'submissionTimestamp':
          return this.compare(a.timestamp, b.timestamp, isAsc);
        case 'requestStatus':
          return this.compare(a.requestStatus, b.requestStatus, isAsc);
        case 'permitStatus':
          return this.compare(a.ptwStatus?.taskStatus, b.ptwStatus?.taskStatus, isAsc);
        default:
          return 0;
      }
    });
  }

  public compare(
    a: number | string | undefined | Date, 
    b: number | string | undefined | Date, 
    isAsc: boolean): any {
    return (a! < b! ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string): void {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  public onPageChanged(event: any): void {
    let firstCut = event.pageIndex * event.pageSize;
    let secondCut = firstCut + event.pageSize;
    this.activePageSortedData = this.sortedData.slice(firstCut, secondCut);
  }

  public async expandSelectedPtw(id: string): Promise<void> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    this.dialogRefPtwDets = this.dialog.open(PtwDetailsComponent, dialogConfig);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  public openSignOutDialog() : void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action);
  }
}