// ==============================================================================================================================================================================

import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/interfaces/User';
import { ValidatorReqdetsComponent } from 'src/app/validator-reqdets/components/validator-reqdets/validator-reqdets.component';
import { SignoutDialogComponent } from 'src/app/signout-dialog/components/signout-dialog/signout-dialog.component';
import { CompShareService } from 'src/app/services/comp-share.service';
import { Subscription } from 'rxjs';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { RequestStatus } from 'src/app/constants/RequestStatus';
import { MailService } from 'src/app/services/mail.service';
import { FormControl } from '@angular/forms';

// ==============================================================================================================================================================================

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

// ==============================================================================================================================================================================

export class ValidatorTlComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Angular Materials' paginator and sort variables.)
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  // * (Header columsn refvars to be used in Mat Table.)
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

  // * (Validator user name variable to be displayed in the page.)
  public userNameDisplay: string = "";
  
  // * (Sort by year filter.)
  public ptwYearFilter = new FormControl();

  // * (Sort by permit ID filter.)
  public ptwIdFilter = new FormControl();

  // * (Sort by location of work filter.)
  public locOfWorkFilter = new FormControl();

  // * (Sort by permit type filter.)
  public permitTypeFilter = new FormControl();

  // * (Sort by request status filter.)
  public requestStatusFilter = new FormControl();

  // * (Sort by permit status filter.)
  public permitStatusFilter = new FormControl();

  // * (Filtered values object.)
  public filteredValues = {
    ptwId: "",
    locWork: "",
    ptwYear: "",
    permitType: "",
    requestStatus: "",
    permitStatus: ""
  };

  // * (To store unique year values derived from all submitted permits.)
  public ptwYearList: string[] = [""];

  // * (Empty data source for Mat Table, using IPermitToWork interface template.)
  public dataSource: MatTableDataSource<IPermitToWork> = new MatTableDataSource<IPermitToWork>();
  
  // * (Interfaced empty data array.)
  public activeData: IPermitToWork[] = [];

  // * (Check if it's currently loading.)
  public isLoading: boolean = false;

  // * (Click event subscription for any callback from the emitter.)
  private clickEventSub: Subscription = new Subscription();

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(
    private db: DbService,
    public dialog: MatDialog, 
    public dialogRefPtwDets: MatDialogRef<ValidatorReqdetsComponent>,
    public dialogRefSignOut: MatDialogRef<SignoutDialogComponent>,
    private router: Router,
    private auth: AuthService,
    private msg: MessageService,
    private compShare: CompShareService,
    private mail: MailService
  ) {
    // * (Subscribe to detect any click event that triggers changes in UI, then do 
    // something afterwards.)
    this.clickEventSub = this.compShare.getClickEvent().subscribe(() => {
      // * (Refresh and refetch permit data from the server, and load them back to 
      // Mat Table.)
      this.refresh();

      // * (Reset all filter field value to empty.)
      this.ptwYearFilter.setValue(""); 
      this.ptwIdFilter.patchValue(""); 
      this.locOfWorkFilter.patchValue("");
      this.permitTypeFilter.setValue("");
      this.requestStatusFilter.setValue("");
      this.permitStatusFilter.setValue("");

      console.log(this.clickEventSub);
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void { 
    // * (Check current login session.)
    this.checkSession();

    // * (Subscribe each filter when value changes in inputs, which the inputs will be 
    // parsed into their respective filter to be used for filtering Mat Table data.)
    this.ptwYearFilter.valueChanges.subscribe((filterValue: string) => {
      this.filteredValues["ptwYear"] = filterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.ptwIdFilter.valueChanges.subscribe((filterValue: string) => {
      this.filteredValues["ptwId"] = filterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.locOfWorkFilter.valueChanges.subscribe((filterValue: string) => {
      this.filteredValues["locWork"] = filterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.permitTypeFilter.valueChanges.subscribe((filterValue: string) => {
      this.filteredValues["permitType"] = filterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.requestStatusFilter.valueChanges.subscribe((filterValue: string) => {
      this.filteredValues["requestStatus"] = filterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.permitStatusFilter.valueChanges.subscribe((filterValue: string) => {
      this.filteredValues["permitStatus"] = filterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    
    this.getUniquePtwYear();

    this.refresh();

    this.ptwYearFilter.setValue(""); 
    this.ptwIdFilter.patchValue(""); 
    this.locOfWorkFilter.patchValue("");
    this.permitTypeFilter.setValue("");
    this.requestStatusFilter.setValue("");
    this.permitStatusFilter.setValue("");
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Check if there is any existing login session in this page. If yes,
  // remain on the same page i.e.: inSession = true. Else, redirect user 
  // to sign-in page.)
  public checkSession(): void {
    this.auth.checkSession(true).subscribe((signedInCallback: User[]) => { 
      if (signedInCallback[0]?.userId != null) {
        this.auth.signIn(signedInCallback[0].userId, signedInCallback[0].userPw);
        this.userNameDisplay = signedInCallback[0].userName + " (" + signedInCallback[0].userId + ")";
        
        // * (Send an event signal to convert home title's onclick function as sign out func
        // instead of normal router func.)
        this.compShare.sendHomeTitleAsSignOutEvent();

        console.log("Currently signed in validator:", signedInCallback[0].userId);
      } else {
        console.log("Currently signed in validator: None");
        this.navigateTo("validator-sign-in");
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Get unique year values derived from all submitted permits.)
  public getUniquePtwYear(): void {
    this.db.fetchAll().subscribe((result: IPermitToWork[]) => {
      let uniqueYears = [...new Set(result.map((res: IPermitToWork) => res.ptwYear))];
      for (let year of uniqueYears) {
        this.ptwYearList.push(year);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Refresh and refetch permit data from the server, and load them back to 
  // Mat Table.)
  public refresh(): void {
    // * (Make the sign-in button temporarily disabled until operation is completed.)
    this.isLoading = true;

    this.db.fetchAll().subscribe((result: IPermitToWork[]) => {
      // * (Re-enable the sign-in button.)
      this.isLoading = false;

      // * (Make the subscription result to be data of Mat Table.)
      this.activeData = result;
      this.activeData.sort((a: IPermitToWork, b: IPermitToWork) => 
        (a.ptwId.substring(4, 10).valueOf() > b.ptwId.substring(4, 10).valueOf())? -1 : 1
      );

      // * (Check if any permit in the list goes pass permit validity. If yes, update 
      // the permit status to be expired. Else, remain the same.)
      this.checkExpire(this.activeData);

      // * (Parse Mat Table data to be used in Mat Table.)
      this.dataSource = new MatTableDataSource(this.activeData);
      // * (Make it so that the Mat Table data be sortable via column headers.)
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
      // * (Apply custom filter parameters to Mat Table data.)
      this.dataSource.filterPredicate = this.customFilterPredicate();
      // * (Assign Mat Table paginator to data source.)
      this.dataSource.paginator = this.paginator;
      // * (Assign Mat Table sort to data source.)
      this.dataSource.sort = this.sort;
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Return a custom filter for sorting data source assigned to the Mat Table.)
  public customFilterPredicate(): any {
    const custFp = (data: IPermitToWork, filter: string): boolean => {
      let searchString: any = JSON.parse(filter);
             
             // * (Filter by ptwYear.)
      return data.ptwYear.trim().toLowerCase().indexOf(searchString.ptwYear) !== -1 &&
             // * (Filter by ptwId - lowercase.)
             (data.ptwId.trim().toLowerCase().indexOf(searchString.ptwId) !== -1 ||
             // * (Filter by ptwId.)
             data.ptwId.trim().indexOf(searchString.ptwId) !== -1) &&
             // * (Filter by locOfWork.main - lowercase.)
             (data.locationOfWork.main.trim().toLowerCase().indexOf(searchString.locWork) !== -1 ||
             // * (Filter by locOfWork.sub - lowercase.)
             data.locationOfWork.sub.trim().toLowerCase().indexOf(searchString.locWork) !== -1) &&
             // * (Filter by permitType - lowercase.)
             (data.permitType.trim().toLowerCase().indexOf(searchString.permitType) !== -1 ||
             // * (Filter by permitType.)
             data.permitType.trim().indexOf(searchString.permitType) !== -1) &&
             // * (Filter by requestStatus - lowercase.)
             (data.requestStatus.trim().toLowerCase().indexOf(searchString.requestStatus) !== -1 ||
             // * (Filter by requestStatus.)
             data.requestStatus.trim().indexOf(searchString.requestStatus) !== -1) &&
             // * (Filter by permitStatus - lowercase.)
             (data.ptwStatus.permitStatus.trim().toLowerCase().indexOf(searchString.permitStatus) !== -1 ||
             // * (Filter by permitStatus.)
             data.ptwStatus.permitStatus.trim().indexOf(searchString.permitStatus) !== -1);
    }

    return custFp;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open a selected permit to expand its details and further actions.)
  public async expandSelectedPtw(id: string): Promise<void> {
    const dialogConfig = new MatDialogConfig();
    // * (Send id and username value to the dialog to open specific permit 
    // details by id.)
    dialogConfig.data = {
      id: id,
      userName: this.userNameDisplay
    };
    // * (Open the dialog with injected data - id, username.)
    this.dialogRefPtwDets = this.dialog.open(ValidatorReqdetsComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Check if any permit in the list goes pass permit validity. If yes, update 
  // the permit status to be expired. Else, remain the same.)
  public checkExpire(activeDataList: IPermitToWork[]): void {
    for (let data of activeDataList) {
      var endWorkingDateTime: Date = new Date(data.endWorkingDateTime);

      // * (If a particular permit status is not valid, do nothing.)
      if (data.ptwStatus.permitStatus != PermitStatus.STATUS_VALID) {
        return;
      }

      // * (If the particular end working date time is less than current time, invoke
      // function to make the said permit expires.)
      if (endWorkingDateTime.valueOf() < Date.now()) {
        this.makeExpire(data);
      }
    }
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Make a permit to expire.)
  public makeExpire(target: IPermitToWork): void {
    target.ptwStatus.permitStatus = PermitStatus.STATUS_EXPIRED;
    target.requestStatus = RequestStatus.REQUEST_NULLED;
    this.postPtwReq(target);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Update the permit-to-expire to the server.)
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
      //toExpire?.taskDescription,
      toExpire?.predefinedTask,
      toExpire?.predefinedTaskOthers,
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
      toExpire?.attendantDets?.[0].role,
      toExpire?.attendantDets?.[0].contactNo,

      toExpire?.attendantDets?.[1].name,
      toExpire?.attendantDets?.[1].nricOrFinNo,
      toExpire?.attendantDets?.[1].role,
      toExpire?.attendantDets?.[1].contactNo,

      toExpire?.attendantDets?.[2].name,
      toExpire?.attendantDets?.[2].nricOrFinNo,
      toExpire?.attendantDets?.[2].role,
      toExpire?.attendantDets?.[2].contactNo,

      toExpire?.attendantDets?.[3].name,
      toExpire?.attendantDets?.[3].nricOrFinNo,
      toExpire?.attendantDets?.[3].role,
      toExpire?.attendantDets?.[3].contactNo,

      toExpire?.attendantDets?.[4].name,
      toExpire?.attendantDets?.[4].nricOrFinNo,
      toExpire?.attendantDets?.[4].role,
      toExpire?.attendantDets?.[4].contactNo,

      toExpire?.attendantDets?.[5].name,
      toExpire?.attendantDets?.[5].nricOrFinNo,
      toExpire?.attendantDets?.[5].role,
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

    // * (Afterwards, send an email notifying the action.)
    this.db.fetchWith("id", toExpire.id.toString()).subscribe((response: IPermitToWork[]) => {
      this.mail.send(response[0], response[0].permitType);
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Router navigation without history tracebacks.)
  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open sign-out dialog to sign-out user.)
  public openSignOutDialog() : void {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefSignOut = this.dialog.open(SignoutDialogComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Self-expiring toast message box after an action is performed.)
  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// ==============================================================================================================================================================================