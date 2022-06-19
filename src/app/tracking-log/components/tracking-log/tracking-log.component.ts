import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { PtwDetailsComponent } from 'src/app/ptw-details/components/ptw-details/ptw-details.component';

@Component({
  selector: 'app-tracking-log',
  templateUrl: './tracking-log.component.html',
  styleUrls: ['./tracking-log.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: { }
    }
  ]
})
export class TrackingLogComponent implements OnInit {
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
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  public sortedData: IPermitToWork[] = [];
  public activePageSortedData: IPermitToWork[] = [];

  constructor(
    private db: DbService,
    public dialog: MatDialog, 
    public dialogRefPtwDets : MatDialogRef<PtwDetailsComponent>,
    private router: Router,
    private msg: MessageService
  ) { }

  public ngOnInit(): void { 
    this.refresh();
  }

  public refresh(): void {
    this.db.fetch()
      .subscribe((data : IPermitToWork[]) => {
        console.log(data);
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

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action);
  }
}