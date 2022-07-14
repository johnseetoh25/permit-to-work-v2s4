import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { PtwDetailsComponent } from 'src/app/ptw-details/components/ptw-details/ptw-details.component';
import { CompShareService } from 'src/app/services/comp-share.service';
import { Subscription } from 'rxjs';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { RequestStatus } from 'src/app/constants/RequestStatus';
import { MailService } from 'src/app/services/mail.service';
import { FormControl } from '@angular/forms';

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
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  public displayedHeaderColumns: string[] = [
    "ptwId",
    "locationOfWork",
    "permitType",
    "permitValidity",
    "applicantName",
    "submissionTimestamp",
    "requestStatus",
    "permitStatus",
    "processingStatus",
    "action"
  ];

  public ptwYearFilter = new FormControl();
  public ptwIdFilter = new FormControl();
  public locOfWorkFilter = new FormControl();
  public permitTypeFilter = new FormControl();
  public requestStatusFilter = new FormControl();
  public permitStatusFilter = new FormControl();
  public globalFilter = "";
  public filteredValues = {
    ptwId: "",
    locWork: "",
    ptwYear: "",
    permitType: "",
    requestStatus: "",
    permitStatus: ""
  };

  public ptwYearList: string[] = [""];

  public dataSource: MatTableDataSource<IPermitToWork> = new MatTableDataSource<IPermitToWork>();
  public activeData: IPermitToWork[] = [];
  public isLoading: boolean = false;

  private clickEventSub: Subscription;

  constructor(
    private db: DbService,
    public dialog: MatDialog, 
    public dialogRefPtwDets: MatDialogRef<PtwDetailsComponent>,
    private router: Router,
    private msg: MessageService,
    private compShare: CompShareService,
    private mail: MailService
  ) {
    this.clickEventSub = this.compShare.getClickEvent().subscribe(() => {
      this.refresh();
      this.ptwYearFilter.setValue(''); 
      this.ptwIdFilter.patchValue(''); 
      this.locOfWorkFilter.patchValue('');
      this.permitTypeFilter.setValue('');
      this.requestStatusFilter.setValue('');
      this.permitStatusFilter.setValue('');
    });
  }

  public ngOnInit(): void {
    this.ptwYearFilter.valueChanges.subscribe((ptwYearFilterValue) => {
      this.filteredValues["ptwYear"] = ptwYearFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.ptwIdFilter.valueChanges.subscribe((ptwIdFilterValue) => {
      this.filteredValues["ptwId"] = ptwIdFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.locOfWorkFilter.valueChanges.subscribe((locOfWorkFilterValue) => {
      this.filteredValues["locWork"] = locOfWorkFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.permitTypeFilter.valueChanges.subscribe((permitTypeFilterValue) => {
      this.filteredValues["permitType"] = permitTypeFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.requestStatusFilter.valueChanges.subscribe((requestStatusFilterValue) => {
      this.filteredValues["requestStatus"] = requestStatusFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.permitStatusFilter.valueChanges.subscribe((permitStatusFilterValue) => {
      this.filteredValues["permitStatus"] = permitStatusFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.getUniquePtwYear();
    this.refresh();
    this.ptwYearFilter.setValue(''); 
    this.ptwIdFilter.patchValue(''); 
    this.locOfWorkFilter.patchValue('');
    this.permitTypeFilter.setValue('');
    this.requestStatusFilter.setValue('');
    this.permitStatusFilter.setValue('');
  }

  public getUniquePtwYear(): void {
    this.db.fetchAll().subscribe((resp: IPermitToWork[]) => {
      let key = [...new Set(resp.map(res => res.ptwYear))];
      for (let k of key) {
        this.ptwYearList.push(k);
      }
    });
  }

  public refresh(): void {
    this.isLoading = true;
    this.db.fetchAll().subscribe((data: IPermitToWork[]) => {
      console.log(data);
      this.isLoading = false;
      this.activeData = data;
      this.activeData.sort((a, b) => 
        (a.ptwId.substring(4, 10).valueOf() > b.ptwId.substring(4, 10).valueOf())? -1 : 1
      );
      this.checkExpire(this.activeData);
      this.dataSource = new MatTableDataSource(this.activeData);
      this.dataSource.sortingDataAccessor = (obj: any, property: any) => {
        switch (property) {
          case "ptwId": return obj.ptwId;
          case "locationOfWork": return obj.locationOfWork.main;
          case "permitType": return obj.permitType;
          case "permitValidity": return obj.startWorkingDateTime;
          case "applicantName": return obj.applicantDets.name;
          case "submissionTimestamp": return obj.timestamp;
          case "requestStatus": return obj.requestStatus;
          case "permitStatus": return obj.ptwStatus.permitStatus;
          default: return obj[property];
        }
      };
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public customFilterPredicate(): any {
    const custFp = (data: IPermitToWork, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        globalMatch = data.ptwId.trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return false;
      }

      let searchString = JSON.parse(filter);
      return data.ptwYear.trim().toLowerCase().indexOf(searchString.ptwYear) !== -1 &&
             (data.ptwId.trim().toLowerCase().indexOf(searchString.ptwId) !== -1 ||
             data.ptwId.trim().indexOf(searchString.ptwId) !== -1) &&
             (data.locationOfWork.main.trim().toLowerCase().indexOf(searchString.locWork) !== -1 ||
             data.locationOfWork.sub.trim().toLowerCase().indexOf(searchString.locWork) !== -1) &&
             (data.permitType.trim().toLowerCase().indexOf(searchString.permitType) !== -1 ||
             data.permitType.trim().indexOf(searchString.permitType) !== -1) &&
             (data.requestStatus.trim().toLowerCase().indexOf(searchString.requestStatus) !== -1 ||
             data.requestStatus.trim().indexOf(searchString.requestStatus) !== -1) && 
             (data.ptwStatus.permitStatus.trim().toLowerCase().indexOf(searchString.permitStatus) !== -1 ||
             data.ptwStatus.permitStatus.trim().indexOf(searchString.permitStatus) !== -1);
    }

    return custFp;
  }

  public async expandSelectedPtw(id: string): Promise<void> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    this.dialogRefPtwDets = this.dialog.open(PtwDetailsComponent, dialogConfig);
  }

  public checkExpire(dataList: IPermitToWork[]): void {
    for (let dt of dataList) {
      var ewdt: Date = new Date(dt.endWorkingDateTime);
      if (dt.ptwStatus.permitStatus == PermitStatus.STATUS_VALID) {
        if (ewdt.valueOf() < Date.now()) {
          this.makeExpire(dt);
        }
      }
    }
  }

  public makeExpire(res: IPermitToWork): void {
    console.log(res.ptwId);
    res.ptwStatus.permitStatus = PermitStatus.STATUS_EXPIRED;
    res.requestStatus = RequestStatus.REQUEST_NULLED;
    this.postPtwReq(res);
  }

  public postPtwReq(toExpire: IPermitToWork): void {
    this.db.update(
      toExpire?.id,
      toExpire?.ptwId,
      toExpire?.ptwYear,
      toExpire?.permitType,
      toExpire?.locationOfWork?.main,
      toExpire?.locationOfWork?.sub,
      toExpire?.startWorkingDateTime,
      toExpire?.endWorkingDateTime,
      toExpire?.taskDescription,
      toExpire?.noOfWorkers,
      toExpire?.noOfSupervisors,

      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toExpire?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toExpire?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
      toExpire?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
      toExpire?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
      toExpire?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

      toExpire?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
      toExpire?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
      toExpire?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
      toExpire?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

      toExpire?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
      toExpire?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
      toExpire?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
      toExpire?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

      toExpire?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
      toExpire?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

      toExpire?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
      toExpire?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
      toExpire?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

      toExpire?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
      toExpire?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
      toExpire?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
      toExpire?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

      toExpire?.confinedSpace?.sectionThree?.permitReview?.q01,
      toExpire?.confinedSpace?.sectionThree?.permitReview?.q02,
      toExpire?.confinedSpace?.sectionThree?.permitReview?.q03,
      toExpire?.confinedSpace?.sectionThree?.permitReview?.q04,

      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
      toExpire?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

      toExpire?.hotWork?.sectionTwo?.assessment?.q01?.choice,
      toExpire?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

      toExpire?.hotWork?.sectionThree?.permitReview?.q01?.choice,
      toExpire?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
      toExpire?.hotWork?.sectionThree?.permitReview?.q02?.choice,
      toExpire?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
      toExpire?.hotWork?.sectionThree?.permitReview?.q03?.choice,
      toExpire?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
      toExpire?.hotWork?.sectionThree?.permitReview?.q04?.choice,
      toExpire?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toExpire?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toExpire?.coldWork?.sectionTwo?.assessment?.q01?.choice,
      toExpire?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

      toExpire?.coldWork?.sectionThree?.permitReview?.q01?.choice,
      toExpire?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
      toExpire?.coldWork?.sectionThree?.permitReview?.q02?.choice,
      toExpire?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
      toExpire?.coldWork?.sectionThree?.permitReview?.q03?.choice,
      toExpire?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
      toExpire?.coldWork?.sectionThree?.permitReview?.q04?.choice,
      toExpire?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toExpire?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toExpire?.electrical?.sectionTwo?.assessment?.q01?.choice,
      toExpire?.electrical?.sectionTwo?.assessment?.q01?.remarks,

      toExpire?.electrical?.sectionThree?.permitReview?.q01?.choice,
      toExpire?.electrical?.sectionThree?.permitReview?.q01?.remarks,
      toExpire?.electrical?.sectionThree?.permitReview?.q02?.choice,
      toExpire?.electrical?.sectionThree?.permitReview?.q02?.remarks,
      toExpire?.electrical?.sectionThree?.permitReview?.q03?.choice,
      toExpire?.electrical?.sectionThree?.permitReview?.q03?.remarks,
      toExpire?.electrical?.sectionThree?.permitReview?.q04?.choice,
      toExpire?.electrical?.sectionThree?.permitReview?.q04?.remarks,

      toExpire?.attendantDets?.[0].name,
      toExpire?.attendantDets?.[0].nricOrFinNo,
      toExpire?.attendantDets?.[0].contactNo,

      toExpire?.attendantDets?.[1].name,
      toExpire?.attendantDets?.[1].nricOrFinNo,
      toExpire?.attendantDets?.[1].contactNo,

      toExpire?.attendantDets?.[2].name,
      toExpire?.attendantDets?.[2].nricOrFinNo,
      toExpire?.attendantDets?.[2].contactNo,

      toExpire?.attendantDets?.[3].name,
      toExpire?.attendantDets?.[3].nricOrFinNo,
      toExpire?.attendantDets?.[3].contactNo,

      toExpire?.attendantDets?.[4].name,
      toExpire?.attendantDets?.[4].nricOrFinNo,
      toExpire?.attendantDets?.[4].contactNo,

      toExpire?.attendantDets?.[5].name,
      toExpire?.attendantDets?.[5].nricOrFinNo,
      toExpire?.attendantDets?.[5].contactNo,

      toExpire?.applicantDets?.name,
      toExpire?.applicantDets?.nricOrFinNo,
      toExpire?.applicantDets?.orgType,
      toExpire?.applicantDets?.orgName,
      toExpire?.applicantDets?.depName,
      toExpire?.applicantDets?.contactNo,
      toExpire?.applicantDets?.email,

      toExpire?.ptwStatus?.permitStatus,
      toExpire?.ptwStatus?.taskStatus,
      toExpire?.ptwStatus?.remarks,
      toExpire?.ptwStatus?.checked,
      toExpire?.ptwStatus?.supervisorName,
      toExpire?.ptwStatus?.wantToTerminate,
      toExpire?.ptwStatus?.reqTermTimestamp,
      toExpire?.ptwStatus?.terminatedTimestamp,
      toExpire?.ptwStatus?.timestamp,

      toExpire?.safetyAssessorEvaluation?.passed,
      toExpire?.safetyAssessorEvaluation?.name,
      toExpire?.safetyAssessorEvaluation?.timestamp,

      toExpire?.authorisedManagerApproval?.passed,
      toExpire?.authorisedManagerApproval?.name,
      toExpire?.authorisedManagerApproval?.timestamp,

      toExpire?.requestStatus,
      toExpire?.wantToCancel,
      toExpire?.reqCancTimestamp,
      toExpire?.cancelledTimestamp,
      toExpire?.timestamp
    );

    this.db.fetchWith("id", toExpire.id.toString()).subscribe((resp: IPermitToWork[]) => {
      //this.mail.send(resp[0], resp[0].permitType);
    });
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }
}