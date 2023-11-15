// ==============================================================================================================================================================================

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { createMask } from '@ngneat/input-mask';
import { SubmitDialogComponent } from 'src/app/submit-dialog/components/submit-dialog/submit-dialog.component';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { Router } from '@angular/router';
import { AttendantDets } from 'src/app/interfaces/AttendantDets';
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { RequestStatus } from 'src/app/constants/RequestStatus';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { TaskStatus } from 'src/app/constants/TaskStatus';
import { PermitTypes } from 'src/app/constants/PermitTypes';

// ==============================================================================================================================================================================

@Component({
  selector: 'app-ptw-request',
  templateUrl: './ptw-request.component.html',
  styleUrls: ['./ptw-request.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    {
      provide: MatDialogRef,
      useValue: { }
    }
  ]
})

// ==============================================================================================================================================================================

export class PtwRequestComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Request form data.)
  public reqFormData: IPermitToWork = <IPermitToWork>{};

  // * (Error message for stepper tabs.)
  public errorMessage: string = "Please complete all the required fields.";

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // NOTE: Vars with comment tag [REQ_FORM_DATA] indicate data to be inserted into 
  //       reqFormData.

  // * (Stepper form group for Section One A.)
  public sectionOneAFormGroup: FormGroup = <FormGroup>{};

  // * (Additional form validators and limiters.)
  dateToday: Date = new Date();
  dateTmr: Date = new Date();
  maxDate: Date | null = new Date(new Date().setDate(2));
  public radioButtonGroup: string[] = ['Yes', 'No', 'N/A'];
  public radioButtonGroupAlt: string[] = ['Yes', 'No'];
  public nricOrFinNoInputMask = createMask("A9999999A");
  public contactNoInputMask = createMask("+65 9999-9999");

  /* [REQ_FORM_DATA] */ public selectedLocationOfWork: string = "";
  /* [REQ_FORM_DATA] */ public selectedLocationSector: string = "";
  /* [REQ_FORM_DATA] */ public selectedPermitType: string = "";
  /* [REQ_FORM_DATA] */ public otherLocationsInput: string = "";
                        public startDateInput: Date = new Date();
                        public endDateInput: Date = new Date();
  /* [REQ_FORM_DATA] */ public startDateTimeConcat: string = "";
                        public startTimeInput: Date = new Date();
                        public endTimeInput: Date = new Date();
  /* [REQ_FORM_DATA] */ public endDateTimeConcat: string = "";
  /* [REQ_FORM_DATA] */ public selectedPredefinedTask: string = "";                       
                        public predefinedTaskOthersInput: string = "";
                        public totalNoOfAttendants: number = 0;
                        public noOfWorkersEventValue: number = 1;
  /* [REQ_FORM_DATA] */ public noOfWorkersInput: number = 0;
                        public noOfSupervisorsEventValue: number = 1;
  /* [REQ_FORM_DATA] */ public noOfSupervisorsInput: number = 0;

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Stepper form group for Section One B.)
  public sectionOneBFormGroup!: FormGroup;

  // ------------------------------ * (WAHP) * ------------------------------
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q01_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q01_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q02_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q02_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q03_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q03_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q04_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q04_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q05_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q05_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q06_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q06_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q07_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q07_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q08_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q08_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q09_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q09_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q10_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q10_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public wah_s1_cmi_q11_specifyInput: string = "";

  // ------------------------------ * (CSP) * ------------------------------
  /* [REQ_FORM_DATA] */ public cs_s1_ph_atmoInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_ph_nonAtmoInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q01_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q02_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q03_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q04_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q05_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q06_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q07_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_per_q08_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q01_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q02_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q03_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q04_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q05_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q06_checkedInput: string = "";
  /* [REQ_FORM_DATA] */ public cs_s1_cmi_ppe_q07_specifyInput: string = "";

  // ------------------------------ * (HWP) * ------------------------------
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q01_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q01_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q02_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q02_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q03_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q03_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q04_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q04_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q05_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q05_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q06_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q06_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q07_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q07_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q08_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q08_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q09_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q09_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q10_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q10_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q11_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q11_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q12_specifyInput: string = "";
  /* [REQ_FORM_DATA] */ public hw_s1_cmi_q13_specifyInput: string = "";

  // ------------------------------ * (CWP) * ------------------------------
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q01_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q01_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q02_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q02_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q03_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q03_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q04_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q04_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q05_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q05_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q06_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q06_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q07_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q07_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q08_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q08_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q09_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q09_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q10_specifyInput: string = "";
  /* [REQ_FORM_DATA] */ public cw_s1_cmi_q11_specifyInput: string = "";

  // ------------------------------ * (EP) * ------------------------------
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q01_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q01_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q02_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q02_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q03_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q03_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q04_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q04_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q05_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q05_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q06_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q06_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q07_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q07_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q08_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q08_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q09_choiceInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q09_remarksInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q10_specifyInput: string = "";
  /* [REQ_FORM_DATA] */ public e_s1_cmi_q11_specifyInput: string = "";

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * (Stepper form group for Section One C.)
  public sectionOneCFormGroup!: FormGroup;

  public displayedHeaderColumns: string[] = [ "id", "name", "nricOrFinNo", "contactNo" ];
  public attendantDetsData: Array<AttendantDets> = [
    /* [REQ_FORM_DATA] */ { id: 1, name: "", nricOrFinNo: "", role: "", contactNo: "" },
    /* [REQ_FORM_DATA] */ { id: 2, name: "", nricOrFinNo: "", role: "", contactNo: "" },
    /* [REQ_FORM_DATA] */ { id: 3, name: "", nricOrFinNo: "", role: "", contactNo: "" },
    /* [REQ_FORM_DATA] */ { id: 4, name: "", nricOrFinNo: "", role: "", contactNo: "" },
    /* [REQ_FORM_DATA] */ { id: 5, name: "", nricOrFinNo: "", role: "", contactNo: "" },
    /* [REQ_FORM_DATA] */ { id: 6, name: "", nricOrFinNo: "", role: "", contactNo: "" },
  ];
  /* [REQ_FORM_DATA] */ public applicantNameInput: string = "";
  /* [REQ_FORM_DATA] */ public applicantNricOrFinNoInput: string = "";
  /* [REQ_FORM_DATA] */ public selectedApplicantOrganisationType: string = "";
  /* [REQ_FORM_DATA] */ public applicantOrganisationNameInput: string = "";
  /* [REQ_FORM_DATA] */ public applicantDepartmentNameInput: string = "";
  /* [REQ_FORM_DATA] */ public applicantContactNoInput: string = "";  
  /* [REQ_FORM_DATA] */ public applicantEmailInput: string = "";
  //public applicantEmailInputMask = createMask("@student.tp.edu.sg");
  public applicantDeclarationChecked: boolean = false;
  public selectedAttendantDetails01Role: string = "";
  public selectedAttendantDetails02Role: string = "";
  public selectedAttendantDetails03Role: string = "";
  public selectedAttendantDetails04Role: string = "";
  public selectedAttendantDetails05Role: string = "";
  public selectedAttendantDetails06Role: string = "";

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog, 
    public submitDialogRef: MatDialogRef<SubmitDialogComponent>,
    private router: Router
  ) {
    // * (Get date after today by 1.)
    this.dateTmr.setDate(this.dateToday.getDate() + 1);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void {
    // * (Set starting no. of workers.)
    this.setNoOfWorkers(this.noOfWorkersEventValue);
    // * (Set starting no. of supervisors.)
    this.setNoOfSupervisors(this.noOfSupervisorsEventValue);
    // * (Total no. of displayable rows from total personnel.)
    this.totalNoOfAttendants = this.calcNoOfTableRowDisplayed();

    // * (Setting up form validators for Section One A.)
    this.sectionOneAFormGroup = this.formBuilder.group({
      locationOfWork: ["", Validators.required],
      locationSector: ["", Validators.required],
      permitType: ["", Validators.required],
      startDate: ["", Validators.required],
      startTime: ["", Validators.required],
      endDate: ["", Validators.required],
      endTime: ["", Validators.required],
      predefinedTask: ["", Validators.required],
      predefinedTaskOthers: ["", Validators.required],
      noOfWorkers: ["", Validators.required],
      noOfSpvs: ["", Validators.required],
    });

    // * (Setting up form validators for Section One B.)
    this.sectionOneBFormGroup = this.formBuilder.group({
      // ------------------------------ * (WAHP) * ------------------------------
      wah_s1_cmi_q01_choice: ["", Validators.required],
      wah_s1_cmi_q02_choice: ["", Validators.required],
      wah_s1_cmi_q03_choice: ["", Validators.required],
      wah_s1_cmi_q04_choice: ["", Validators.required],
      wah_s1_cmi_q05_choice: ["", Validators.required],
      wah_s1_cmi_q06_choice: ["", Validators.required],
      wah_s1_cmi_q07_choice: ["", Validators.required],
      wah_s1_cmi_q08_choice: ["", Validators.required],
      wah_s1_cmi_q09_choice: ["", Validators.required],
      wah_s1_cmi_q10_choice: ["", Validators.required],

      // ------------------------------ * (CSP) * ------------------------------
      cs_s1_ph_atmo: ["", Validators.required],
      cs_s1_ph_nonAtmo: ["", Validators.required],
      cs_s1_cmi_per_q01_checked: ["", Validators.required],
      cs_s1_cmi_per_q02_checked: ["", Validators.required],
      cs_s1_cmi_per_q03_checked: ["", Validators.required],
      cs_s1_cmi_per_q04_checked: ["", Validators.required],
      cs_s1_cmi_per_q05_checked: ["", Validators.required],
      cs_s1_cmi_per_q06_checked: ["", Validators.required],
      cs_s1_cmi_per_q07_checked: ["", Validators.required],
      cs_s1_cmi_per_q08_checked: ["", Validators.required],
      cs_s1_cmi_ppe_q01_checked: ["", Validators.required],
      cs_s1_cmi_ppe_q02_checked: ["", Validators.required],
      cs_s1_cmi_ppe_q03_checked: ["", Validators.required],
      cs_s1_cmi_ppe_q04_checked: ["", Validators.required],
      cs_s1_cmi_ppe_q05_checked: ["", Validators.required],
      cs_s1_cmi_ppe_q06_checked: ["", Validators.required],

      // ------------------------------ * (HWP) * ------------------------------
      hw_s1_cmi_q01_choice: ["", Validators.required],
      hw_s1_cmi_q02_choice: ["", Validators.required],
      hw_s1_cmi_q03_choice: ["", Validators.required],
      hw_s1_cmi_q04_choice: ["", Validators.required],
      hw_s1_cmi_q05_choice: ["", Validators.required],
      hw_s1_cmi_q06_choice: ["", Validators.required],
      hw_s1_cmi_q07_choice: ["", Validators.required],
      hw_s1_cmi_q08_choice: ["", Validators.required],
      hw_s1_cmi_q09_choice: ["", Validators.required],
      hw_s1_cmi_q10_choice: ["", Validators.required],
      hw_s1_cmi_q11_choice: ["", Validators.required],
      
      // ------------------------------ * (CWP) * ------------------------------
      cw_s1_cmi_q01_choice: ["", Validators.required],
      cw_s1_cmi_q02_choice: ["", Validators.required],
      cw_s1_cmi_q03_choice: ["", Validators.required],
      cw_s1_cmi_q04_choice: ["", Validators.required],
      cw_s1_cmi_q05_choice: ["", Validators.required],
      cw_s1_cmi_q06_choice: ["", Validators.required],
      cw_s1_cmi_q07_choice: ["", Validators.required],
      cw_s1_cmi_q08_choice: ["", Validators.required],
      cw_s1_cmi_q09_choice: ["", Validators.required],

      // ------------------------------ * (EP) * ------------------------------
      e_s1_cmi_q01_choice: ["", Validators.required],
      e_s1_cmi_q02_choice: ["", Validators.required],
      e_s1_cmi_q03_choice: ["", Validators.required],
      e_s1_cmi_q04_choice: ["", Validators.required],
      e_s1_cmi_q05_choice: ["", Validators.required],
      e_s1_cmi_q06_choice: ["", Validators.required],
      e_s1_cmi_q07_choice: ["", Validators.required],
      e_s1_cmi_q08_choice: ["", Validators.required],
      e_s1_cmi_q09_choice: ["", Validators.required],
    });

    // * (Setting up form validators for Section One C.)
    this.sectionOneCFormGroup = this.formBuilder.group({
      // Attendant details
      ad1_name: ["", Validators.required],
      ad1_nricOrFinNo: ["", Validators.required],
      ad1_role: ["", Validators.required],
      ad1_contactNo: ["", Validators.required],
      ad2_name: ["", Validators.required],
      ad2_nricOrFinNo: ["", Validators.required],
      ad2_role: ["", Validators.required],
      ad2_contactNo: ["", Validators.required],
      ad3_name: ["", Validators.required],
      ad3_nricOrFinNo: ["", Validators.required],
      ad3_role: ["", Validators.required],
      ad3_contactNo: ["", Validators.required],
      ad4_name: ["", Validators.required],
      ad4_nricOrFinNo: ["", Validators.required],
      ad4_role: ["", Validators.required],
      ad4_contactNo: ["", Validators.required],
      ad5_name: ["", Validators.required],
      ad5_nricOrFinNo: ["", Validators.required],
      ad5_role: ["", Validators.required],
      ad5_contactNo: ["", Validators.required],
      ad6_name: ["", Validators.required],
      ad6_nricOrFinNo: ["", Validators.required],
      ad6_role: ["", Validators.required],
      ad6_contactNo: ["", Validators.required],
      aplName: ["", Validators.required],
      aplNricOrFinNo: ["", Validators.required],
      aplOrgType: ["", Validators.required],
      aplOrgName: ["", Validators.required],
      aplDepName: ["", Validators.required],
      aplContactNo: ["", Validators.required],
      aplEmail: ["", Validators.required ],
      aplDclChecked: ["", Validators.requiredTrue],
    });
    // * (Show displayable personnel details rows from total personnel no.)
    this.toggleAttendantDetsTableRowValidator(this.totalNoOfAttendants);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  // * (Prompt error message when Section One A contains erronous inputs.)
  public sectionOneAFormGroupError = (controlName: string, errorName: string) => {
    return this.sectionOneAFormGroup.controls[controlName].hasError(errorName);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Prompt error message when Section One B contains erronous inputs.)
  public sectionOneBFormGroupError = (controlName: string, errorName: string) => {
    return this.sectionOneBFormGroup.controls[controlName].hasError(errorName);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Prompt error message when Section One C contains erronous inputs.)
  public sectionOneCFormGroupError = (controlName: string, errorName: string) => {
    return this.sectionOneCFormGroup.controls[controlName].hasError(errorName);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set starting no. of workers.)
  public setNoOfWorkers(value: any) {
    this.noOfWorkersInput = value;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set starting no. of supervisors.)
  public setNoOfSupervisors(value: any) {
    this.noOfSupervisorsInput = value;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Calculate total no. of displayable rows for personnel details.)
  public calcNoOfTableRowDisplayed(): number {
    var total: number = Math.abs(this.noOfWorkersInput + this.noOfSupervisorsInput);
    return total;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Join both start working date and time together as string.)
  public concatStartDateTime(date: Date, time: Date): string {
    let tempDate = new Date(date.toDateString().concat(", ", time.toString()));
    let tempDateString = tempDate.toISOString();
    return tempDateString;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Join both end working date and time together as string.)
  public concatEndDateTime(date: Date, time: Date): string {
    let tempDate = new Date(date.toDateString().concat(", ", time.toString()));
    let tempDateString = tempDate.toISOString();
    return tempDateString;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Toggle form validators for Section One B everytime a diff. permit type is selected.)
  public togglePTWFormValidators(value: string): void {
    switch (value) {
      case PermitTypes.WORK_AT_HEIGHT:
        this.setRequiredAllWahValidators();
        this.clearAllCsValidators();
        this.clearAllHwValidators();
        this.clearAllCwValidators();
        this.clearAllElecValidators();

        this.clearFieldsOf(value);
        this.clearFieldsOf(PermitTypes.CONFINED_SPACE);
        this.clearFieldsOf(PermitTypes.HOT_WORK);
        this.clearFieldsOf(PermitTypes.COLD_WORK);
        this.clearFieldsOf(PermitTypes.ELECTRICAL);

        this.updateAllValidators();

        break;
      case PermitTypes.CONFINED_SPACE:
        this.setRequiredAllCsValidators();
        this.clearAllWahValidators();
        this.clearAllHwValidators();
        this.clearAllCwValidators();
        this.clearAllElecValidators();

        this.clearFieldsOf(value);
        this.clearFieldsOf(PermitTypes.WORK_AT_HEIGHT);
        this.clearFieldsOf(PermitTypes.HOT_WORK);
        this.clearFieldsOf(PermitTypes.COLD_WORK);
        this.clearFieldsOf(PermitTypes.ELECTRICAL);

        this.updateAllValidators();

        break;
      case PermitTypes.HOT_WORK:
        this.setRequiredAllHwValidators();
        this.clearAllWahValidators();
        this.clearAllCsValidators();
        this.clearAllCwValidators();
        this.clearAllElecValidators();

        this.clearFieldsOf(value);
        this.clearFieldsOf(PermitTypes.WORK_AT_HEIGHT);
        this.clearFieldsOf(PermitTypes.CONFINED_SPACE);
        this.clearFieldsOf(PermitTypes.COLD_WORK);
        this.clearFieldsOf(PermitTypes.ELECTRICAL);

        this.updateAllValidators();

        break;
      case PermitTypes.COLD_WORK:
        this.setRequiredAllCwValidators();
        this.clearAllWahValidators();
        this.clearAllCsValidators();
        this.clearAllHwValidators();
        this.clearAllElecValidators();

        this.clearFieldsOf(value);
        this.clearFieldsOf(PermitTypes.WORK_AT_HEIGHT);
        this.clearFieldsOf(PermitTypes.CONFINED_SPACE);
        this.clearFieldsOf(PermitTypes.HOT_WORK);
        this.clearFieldsOf(PermitTypes.ELECTRICAL);

        this.updateAllValidators();

        break;
      case PermitTypes.ELECTRICAL:
        this.setRequiredAllElecValidators();
        this.clearAllWahValidators();
        this.clearAllCsValidators();
        this.clearAllHwValidators();
        this.clearAllCwValidators();

        this.clearFieldsOf(value);
        this.clearFieldsOf(PermitTypes.WORK_AT_HEIGHT);
        this.clearFieldsOf(PermitTypes.CONFINED_SPACE);
        this.clearFieldsOf(PermitTypes.HOT_WORK);
        this.clearFieldsOf(PermitTypes.COLD_WORK);

        this.updateAllValidators();

        break;
      default:
        this.clearAllWahValidators();
        this.clearAllCsValidators();
        this.clearAllHwValidators();
        this.clearAllCwValidators();
        this.clearAllElecValidators();

        this.clearFieldsOf(PermitTypes.WORK_AT_HEIGHT);
        this.clearFieldsOf(PermitTypes.CONFINED_SPACE);
        this.clearFieldsOf(PermitTypes.HOT_WORK);
        this.clearFieldsOf(PermitTypes.COLD_WORK);
        this.clearFieldsOf(PermitTypes.ELECTRICAL);

        this.updateAllValidators();

        break;
    }
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Clear all fields in Section One B.)
  private clearFieldsOf(value: string): void {
    switch (value) {
      case PermitTypes.WORK_AT_HEIGHT:
        this.wah_s1_cmi_q01_choiceInput = "";
        this.wah_s1_cmi_q01_remarksInput = "";
        this.wah_s1_cmi_q02_choiceInput = "";
        this.wah_s1_cmi_q02_remarksInput = "";
        this.wah_s1_cmi_q03_choiceInput = "";
        this.wah_s1_cmi_q03_remarksInput = "";
        this.wah_s1_cmi_q04_choiceInput = "";
        this.wah_s1_cmi_q04_remarksInput = "";
        this.wah_s1_cmi_q05_choiceInput = "";
        this.wah_s1_cmi_q05_remarksInput = "";
        this.wah_s1_cmi_q06_choiceInput = "";
        this.wah_s1_cmi_q06_remarksInput = "";
        this.wah_s1_cmi_q07_choiceInput = "";
        this.wah_s1_cmi_q07_remarksInput = "";
        this.wah_s1_cmi_q08_choiceInput = "";
        this.wah_s1_cmi_q08_remarksInput = "";
        this.wah_s1_cmi_q09_choiceInput = "";
        this.wah_s1_cmi_q09_remarksInput = "";
        this.wah_s1_cmi_q10_choiceInput = "";
        this.wah_s1_cmi_q10_remarksInput = "";
        this.wah_s1_cmi_q11_specifyInput = "";

        break;
      case PermitTypes.CONFINED_SPACE:
        this.cs_s1_ph_atmoInput = "";
        this.cs_s1_ph_nonAtmoInput = "";
        this.cs_s1_cmi_per_q01_checkedInput = "";
        this.cs_s1_cmi_per_q02_checkedInput = "";
        this.cs_s1_cmi_per_q03_checkedInput = "";
        this.cs_s1_cmi_per_q04_checkedInput = "";
        this.cs_s1_cmi_per_q05_checkedInput = "";
        this.cs_s1_cmi_per_q06_checkedInput = "";
        this.cs_s1_cmi_per_q07_checkedInput = "";
        this.cs_s1_cmi_per_q08_checkedInput = "";
        this.cs_s1_cmi_ppe_q01_checkedInput = "";
        this.cs_s1_cmi_ppe_q02_checkedInput = "";
        this.cs_s1_cmi_ppe_q03_checkedInput = "";
        this.cs_s1_cmi_ppe_q04_checkedInput = "";
        this.cs_s1_cmi_ppe_q05_checkedInput = "";
        this.cs_s1_cmi_ppe_q06_checkedInput = "";
        this.cs_s1_cmi_ppe_q07_specifyInput = "";

        break;
      case PermitTypes.HOT_WORK:
        this.hw_s1_cmi_q01_choiceInput= "";
        this.hw_s1_cmi_q01_remarksInput = "";
        this.hw_s1_cmi_q02_choiceInput = "";
        this.hw_s1_cmi_q02_remarksInput = "";
        this.hw_s1_cmi_q03_choiceInput = "";
        this.hw_s1_cmi_q03_remarksInput = "";
        this.hw_s1_cmi_q04_choiceInput = "";
        this.hw_s1_cmi_q04_remarksInput = "";
        this.hw_s1_cmi_q05_choiceInput = "";
        this.hw_s1_cmi_q05_remarksInput = "";
        this.hw_s1_cmi_q06_choiceInput = "";
        this.hw_s1_cmi_q06_remarksInput = "";
        this.hw_s1_cmi_q07_choiceInput = "";
        this.hw_s1_cmi_q07_remarksInput = "";
        this.hw_s1_cmi_q08_choiceInput = "";
        this.hw_s1_cmi_q08_remarksInput = "";
        this.hw_s1_cmi_q09_choiceInput = "";
        this.hw_s1_cmi_q09_remarksInput = "";
        this.hw_s1_cmi_q10_choiceInput = "";
        this.hw_s1_cmi_q10_remarksInput = "";
        this.hw_s1_cmi_q11_choiceInput = "";
        this.hw_s1_cmi_q11_remarksInput = "";
        this.hw_s1_cmi_q12_specifyInput = "";
        this.hw_s1_cmi_q13_specifyInput = "";

        break;
      case PermitTypes.COLD_WORK:
        this.cw_s1_cmi_q01_choiceInput = "";
        this.cw_s1_cmi_q01_remarksInput = "";
        this.cw_s1_cmi_q02_choiceInput = "";
        this.cw_s1_cmi_q02_remarksInput = "";
        this.cw_s1_cmi_q03_choiceInput = "";
        this.cw_s1_cmi_q03_remarksInput = "";
        this.cw_s1_cmi_q04_choiceInput = "";
        this.cw_s1_cmi_q04_remarksInput = "";
        this.cw_s1_cmi_q05_choiceInput = "";
        this.cw_s1_cmi_q05_remarksInput = "";
        this.cw_s1_cmi_q06_choiceInput = "";
        this.cw_s1_cmi_q06_remarksInput = "";
        this.cw_s1_cmi_q07_choiceInput = "";
        this.cw_s1_cmi_q07_remarksInput = "";
        this.cw_s1_cmi_q08_choiceInput = "";
        this.cw_s1_cmi_q08_remarksInput = "";
        this.cw_s1_cmi_q09_choiceInput = "";
        this.cw_s1_cmi_q09_remarksInput = "";
        this.cw_s1_cmi_q10_specifyInput = "";
        this.cw_s1_cmi_q11_specifyInput = "";

        break;
      case PermitTypes.ELECTRICAL:
        this.e_s1_cmi_q01_choiceInput = "";
        this.e_s1_cmi_q01_remarksInput = "";
        this.e_s1_cmi_q02_choiceInput = "";
        this.e_s1_cmi_q02_remarksInput = "";
        this.e_s1_cmi_q03_choiceInput = "";
        this.e_s1_cmi_q03_remarksInput = "";
        this.e_s1_cmi_q04_choiceInput = "";
        this.e_s1_cmi_q04_remarksInput = "";
        this.e_s1_cmi_q05_choiceInput = "";
        this.e_s1_cmi_q05_remarksInput = "";
        this.e_s1_cmi_q06_choiceInput = "";
        this.e_s1_cmi_q06_remarksInput = "";
        this.e_s1_cmi_q07_choiceInput = "";
        this.e_s1_cmi_q07_remarksInput = "";
        this.e_s1_cmi_q08_choiceInput = "";
        this.e_s1_cmi_q08_remarksInput = "";
        this.e_s1_cmi_q09_choiceInput = "";
        this.e_s1_cmi_q09_remarksInput = "";
        this.e_s1_cmi_q10_specifyInput = "";
        this.e_s1_cmi_q11_specifyInput = "";

        break;
      default:
        this.wah_s1_cmi_q01_choiceInput = "";
        this.wah_s1_cmi_q01_remarksInput = "";
        this.wah_s1_cmi_q02_choiceInput = "";
        this.wah_s1_cmi_q02_remarksInput = "";
        this.wah_s1_cmi_q03_choiceInput = "";
        this.wah_s1_cmi_q03_remarksInput = "";
        this.wah_s1_cmi_q04_choiceInput = "";
        this.wah_s1_cmi_q04_remarksInput = "";
        this.wah_s1_cmi_q05_choiceInput = "";
        this.wah_s1_cmi_q05_remarksInput = "";
        this.wah_s1_cmi_q06_choiceInput = "";
        this.wah_s1_cmi_q06_remarksInput = "";
        this.wah_s1_cmi_q07_choiceInput = "";
        this.wah_s1_cmi_q07_remarksInput = "";
        this.wah_s1_cmi_q08_choiceInput = "";
        this.wah_s1_cmi_q08_remarksInput = "";
        this.wah_s1_cmi_q09_choiceInput = "";
        this.wah_s1_cmi_q09_remarksInput = "";
        this.wah_s1_cmi_q10_choiceInput = "";
        this.wah_s1_cmi_q10_remarksInput = "";
        this.wah_s1_cmi_q11_specifyInput = "";
        this.cs_s1_ph_atmoInput = "";
        this.cs_s1_ph_nonAtmoInput = "";
        this.cs_s1_cmi_per_q01_checkedInput = "";
        this.cs_s1_cmi_per_q02_checkedInput = "";
        this.cs_s1_cmi_per_q03_checkedInput = "";
        this.cs_s1_cmi_per_q04_checkedInput = "";
        this.cs_s1_cmi_per_q05_checkedInput = "";
        this.cs_s1_cmi_per_q06_checkedInput = "";
        this.cs_s1_cmi_per_q07_checkedInput = "";
        this.cs_s1_cmi_per_q08_checkedInput = "";
        this.cs_s1_cmi_ppe_q01_checkedInput = "";
        this.cs_s1_cmi_ppe_q02_checkedInput = "";
        this.cs_s1_cmi_ppe_q03_checkedInput = "";
        this.cs_s1_cmi_ppe_q04_checkedInput = "";
        this.cs_s1_cmi_ppe_q05_checkedInput = "";
        this.cs_s1_cmi_ppe_q06_checkedInput = "";
        this.cs_s1_cmi_ppe_q07_specifyInput = "";
        this.hw_s1_cmi_q01_choiceInput= "";
        this.hw_s1_cmi_q01_remarksInput = "";
        this.hw_s1_cmi_q02_choiceInput = "";
        this.hw_s1_cmi_q02_remarksInput = "";
        this.hw_s1_cmi_q03_choiceInput = "";
        this.hw_s1_cmi_q03_remarksInput = "";
        this.hw_s1_cmi_q04_choiceInput = "";
        this.hw_s1_cmi_q04_remarksInput = "";
        this.hw_s1_cmi_q05_choiceInput = "";
        this.hw_s1_cmi_q05_remarksInput = "";
        this.hw_s1_cmi_q06_choiceInput = "";
        this.hw_s1_cmi_q06_remarksInput = "";
        this.hw_s1_cmi_q07_choiceInput = "";
        this.hw_s1_cmi_q07_remarksInput = "";
        this.hw_s1_cmi_q08_choiceInput = "";
        this.hw_s1_cmi_q08_remarksInput = "";
        this.hw_s1_cmi_q09_choiceInput = "";
        this.hw_s1_cmi_q09_remarksInput = "";
        this.hw_s1_cmi_q10_choiceInput = "";
        this.hw_s1_cmi_q10_remarksInput = "";
        this.hw_s1_cmi_q11_choiceInput = "";
        this.hw_s1_cmi_q11_remarksInput = "";
        this.hw_s1_cmi_q12_specifyInput = "";
        this.hw_s1_cmi_q13_specifyInput = "";
        this.cw_s1_cmi_q01_choiceInput = "";
        this.cw_s1_cmi_q01_remarksInput = "";
        this.cw_s1_cmi_q02_choiceInput = "";
        this.cw_s1_cmi_q02_remarksInput = "";
        this.cw_s1_cmi_q03_choiceInput = "";
        this.cw_s1_cmi_q03_remarksInput = "";
        this.cw_s1_cmi_q04_choiceInput = "";
        this.cw_s1_cmi_q04_remarksInput = "";
        this.cw_s1_cmi_q05_choiceInput = "";
        this.cw_s1_cmi_q05_remarksInput = "";
        this.cw_s1_cmi_q06_choiceInput = "";
        this.cw_s1_cmi_q06_remarksInput = "";
        this.cw_s1_cmi_q07_choiceInput = "";
        this.cw_s1_cmi_q07_remarksInput = "";
        this.cw_s1_cmi_q08_choiceInput = "";
        this.cw_s1_cmi_q08_remarksInput = "";
        this.cw_s1_cmi_q09_choiceInput = "";
        this.cw_s1_cmi_q09_remarksInput = "";
        this.cw_s1_cmi_q10_specifyInput = "";
        this.cw_s1_cmi_q11_specifyInput = "";
        this.e_s1_cmi_q01_choiceInput = "";
        this.e_s1_cmi_q01_remarksInput = "";
        this.e_s1_cmi_q02_choiceInput = "";
        this.e_s1_cmi_q02_remarksInput = "";
        this.e_s1_cmi_q03_choiceInput = "";
        this.e_s1_cmi_q03_remarksInput = "";
        this.e_s1_cmi_q04_choiceInput = "";
        this.e_s1_cmi_q04_remarksInput = "";
        this.e_s1_cmi_q05_choiceInput = "";
        this.e_s1_cmi_q05_remarksInput = "";
        this.e_s1_cmi_q06_choiceInput = "";
        this.e_s1_cmi_q06_remarksInput = "";
        this.e_s1_cmi_q07_choiceInput = "";
        this.e_s1_cmi_q07_remarksInput = "";
        this.e_s1_cmi_q08_choiceInput = "";
        this.e_s1_cmi_q08_remarksInput = "";
        this.e_s1_cmi_q09_choiceInput = "";
        this.e_s1_cmi_q09_remarksInput = "";
        this.e_s1_cmi_q10_specifyInput = "";
        this.e_s1_cmi_q11_specifyInput = "";

        break;
    }
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Update all form validators in Section One B.)
  private updateAllValidators(): void {
    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ph_atmo')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ph_nonAtmo')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q01_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q02_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q03_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q04_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q05_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q06_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q07_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q08_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q01_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q02_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q03_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q04_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q05_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q06_checked')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q01_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q02_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q03_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q04_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q05_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q06_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q07_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q08_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q09_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q10_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q11_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q01_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q02_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q03_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q04_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q05_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q06_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q07_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q08_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q09_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q01_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q02_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q03_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q04_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q05_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q06_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q07_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q08_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('e_s1_cmi_q09_choice')?.updateValueAndValidity();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set all form field validators in WAH as required.)
  private setRequiredAllWahValidators(): void {
    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_choice')?.setValidators(Validators.required);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Clear all form field validators in WAH.)
  private clearAllWahValidators(): void {
    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_choice')?.clearValidators();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set all form field validators in CS as required.)
  private setRequiredAllCsValidators(): void {
    this.sectionOneBFormGroup.get('cs_s1_ph_atmo')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_ph_nonAtmo')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q01_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q02_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q03_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q04_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q05_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q06_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q07_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q08_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q01_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q02_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q03_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q04_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q05_checked')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q06_checked')?.setValidators(Validators.required);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Clear all form field validators in CS.)
  private clearAllCsValidators(): void {
    this.sectionOneBFormGroup.get('cs_s1_ph_atmo')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_ph_nonAtmo')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q01_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q02_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q03_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q04_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q05_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q06_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q07_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q08_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q01_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q02_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q03_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q04_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q05_checked')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q06_checked')?.clearValidators();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set all form field validators in HW as required.)
  private setRequiredAllHwValidators(): void {
    this.sectionOneBFormGroup.get('hw_s1_cmi_q01_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q02_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q03_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q04_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q05_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q06_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q07_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q08_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q09_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q10_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('hw_s1_cmi_q11_choice')?.setValidators(Validators.required);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Clear all form field validators in HW.)
  private clearAllHwValidators(): void {
    this.sectionOneBFormGroup.get('hw_s1_cmi_q01_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q02_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q03_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q04_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q05_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q06_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q07_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q08_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q09_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q10_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('hw_s1_cmi_q11_choice')?.clearValidators();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set all form field validators in CW as required.)
  private setRequiredAllCwValidators(): void {
    this.sectionOneBFormGroup.get('cw_s1_cmi_q01_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q02_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q03_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q04_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q05_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q06_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q07_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q08_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cw_s1_cmi_q09_choice')?.setValidators(Validators.required);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Clear all form field validators in CW.)
  private clearAllCwValidators(): void {
    this.sectionOneBFormGroup.get('cw_s1_cmi_q01_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q02_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q03_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q04_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q05_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q06_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q07_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q08_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('cw_s1_cmi_q09_choice')?.clearValidators();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Set all form field validators in E as required.)
  private setRequiredAllElecValidators(): void {
    this.sectionOneBFormGroup.get('e_s1_cmi_q01_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q02_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q03_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q04_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q05_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q06_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q07_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q08_choice')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('e_s1_cmi_q09_choice')?.setValidators(Validators.required);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Clear all form field validators in E.)
  private clearAllElecValidators(): void {
    this.sectionOneBFormGroup.get('e_s1_cmi_q01_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q02_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q03_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q04_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q05_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q06_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q07_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q08_choice')?.clearValidators();
    this.sectionOneBFormGroup.get('e_s1_cmi_q09_choice')?.clearValidators();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Toggle on or off the applicant org name input validator.)
  public toggleApplicantOrgNameValidator(value : string) : void {
    switch (value) {
      case 'Internal':
        this.sectionOneCFormGroup.get('aplOrgName')?.clearValidators();
        break;
      case 'External':
        this.sectionOneCFormGroup.get('aplOrgName')?.setValidators(Validators.required);
        break;
    }

    this.sectionOneCFormGroup.get('aplOrgName')?.updateValueAndValidity();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Toggle on or off the personnel org name input validator.)
  public toggleArdOrgNameValidator(permitType: string, orgType : string) : void {
    switch (permitType) {
      case 'Work at height permit (WAHP)':
        switch (orgType) {
          case 'Internal':
            this.sectionOneBFormGroup.get('wah_s1_ard_orgName')?.clearValidators();
            break;
          case 'External':
            this.sectionOneBFormGroup.get('wah_s1_ard_orgName')?.setValidators(Validators.required);
            break;
        }
        this.sectionOneBFormGroup.get('wah_s1_ard_orgName')?.updateValueAndValidity();
        break;
      case 'Confined space permit (CSP)':
        switch (orgType) {
          case 'Internal':
            this.sectionOneBFormGroup.get('cs_s1_ard_orgName')?.clearValidators();
            break;
          case 'External':
            this.sectionOneBFormGroup.get('cs_s1_ard_orgName')?.setValidators(Validators.required);
            break;
        }
        this.sectionOneBFormGroup.get('cs_s1_ard_orgName')?.updateValueAndValidity();
        break;
    }
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Toggle on or off the personnel details rows validator.)
  public toggleAttendantDetsTableRowValidator(total: number): void {
    switch (total) {
      case 1:
        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad2_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad2_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad2_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_contactNo')?.clearValidators();
        break;

      case 2:
        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad3_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_contactNo')?.clearValidators();
        break;
      
      case 3:
        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad3_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad4_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_contactNo')?.clearValidators();
        break;
        break;

      case 4:
        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad3_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad4_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad4_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad4_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_contactNo')?.clearValidators();
        break;

      case 5:
        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad3_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad4_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad4_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad4_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad5_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.setValidators([Validators.required ]);
        this.sectionOneCFormGroup.get('ad5_role')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad5_contactNo')?.setValidators([Validators.required]);
        this.sectionOneCFormGroup.get('ad6_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_role')?.clearValidators();
        this.sectionOneCFormGroup.get('ad6_contactNo')?.clearValidators();
        break;

        case 6:
          this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([Validators.required ]);
          this.sectionOneCFormGroup.get('ad1_role')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([Validators.required]);
          this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([Validators.required ]);
          this.sectionOneCFormGroup.get('ad2_role')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([Validators.required]);
          this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([Validators.required ]);
          this.sectionOneCFormGroup.get('ad3_role')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([Validators.required]);
          this.sectionOneCFormGroup.get('ad4_name')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.setValidators([Validators.required ]);
          this.sectionOneCFormGroup.get('ad4_role')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad4_contactNo')?.setValidators([Validators.required]);
          this.sectionOneCFormGroup.get('ad5_name')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.setValidators([Validators.required ]);
          this.sectionOneCFormGroup.get('ad5_role')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad5_contactNo')?.setValidators([Validators.required]);
          this.sectionOneCFormGroup.get('ad6_name')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.setValidators([Validators.required ]);
          this.sectionOneCFormGroup.get('ad6_role')?.setValidators(Validators.required);
          this.sectionOneCFormGroup.get('ad6_contactNo')?.setValidators([Validators.required]);
          break;
      }

    this.sectionOneCFormGroup.get('ad1_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad1_role')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad1_contactNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad2_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad2_role')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad2_contactNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad3_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad3_role')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad3_contactNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad4_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad4_role')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad4_contactNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad5_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad5_role')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad5_contactNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad6_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad6_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad6_role')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad6_contactNo')?.updateValueAndValidity();
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Gather all input from the req form and formulate the structure required to send the 
  // data object to the server.)
  public allocateFormData(dataSource: IPermitToWork): IPermitToWork {
    this.startDateTimeConcat = this.concatStartDateTime(this.startDateInput, this.startTimeInput);
    this.endDateTimeConcat = this.concatEndDateTime(this.endDateInput, this.endTimeInput);

    if (this.wah_s1_cmi_q01_choiceInput == "") { this.wah_s1_cmi_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q02_choiceInput == "") { this.wah_s1_cmi_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q03_choiceInput == "") { this.wah_s1_cmi_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q04_choiceInput == "") { this.wah_s1_cmi_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q05_choiceInput == "") { this.wah_s1_cmi_q05_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q06_choiceInput == "") { this.wah_s1_cmi_q06_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q07_choiceInput == "") { this.wah_s1_cmi_q07_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q08_choiceInput == "") { this.wah_s1_cmi_q08_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q09_choiceInput == "") { this.wah_s1_cmi_q09_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q10_choiceInput == "") { this.wah_s1_cmi_q10_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q01_remarksInput == "") { this.wah_s1_cmi_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q02_remarksInput == "") { this.wah_s1_cmi_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q03_remarksInput == "") { this.wah_s1_cmi_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q04_remarksInput == "") { this.wah_s1_cmi_q04_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q05_remarksInput == "") { this.wah_s1_cmi_q05_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q06_remarksInput == "") { this.wah_s1_cmi_q06_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q07_remarksInput == "") { this.wah_s1_cmi_q07_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q08_remarksInput == "") { this.wah_s1_cmi_q08_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q09_remarksInput == "") { this.wah_s1_cmi_q09_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q10_remarksInput == "") { this.wah_s1_cmi_q10_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s1_cmi_q11_specifyInput == "") { this.wah_s1_cmi_q11_specifyInput = DefaultValues.VALUE_NONE; }

    if (this.cs_s1_ph_atmoInput == "") { this.cs_s1_ph_atmoInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_ph_nonAtmoInput == "") { this.cs_s1_ph_nonAtmoInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q01_checkedInput == "") { this.cs_s1_cmi_per_q01_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q02_checkedInput == "") { this.cs_s1_cmi_per_q02_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q03_checkedInput == "") { this.cs_s1_cmi_per_q03_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q04_checkedInput == "") { this.cs_s1_cmi_per_q04_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q05_checkedInput == "") { this.cs_s1_cmi_per_q05_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q06_checkedInput == "") { this.cs_s1_cmi_per_q06_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q07_checkedInput == "") { this.cs_s1_cmi_per_q07_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_per_q08_checkedInput == "") { this.cs_s1_cmi_per_q08_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q01_checkedInput == "") { this.cs_s1_cmi_ppe_q01_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q02_checkedInput == "") { this.cs_s1_cmi_ppe_q02_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q03_checkedInput == "") { this.cs_s1_cmi_ppe_q03_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q04_checkedInput == "") { this.cs_s1_cmi_ppe_q04_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q05_checkedInput == "") { this.cs_s1_cmi_ppe_q05_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q06_checkedInput == "") { this.cs_s1_cmi_ppe_q06_checkedInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s1_cmi_ppe_q07_specifyInput == "") { this.cs_s1_cmi_ppe_q07_specifyInput = DefaultValues.VALUE_NONE; }

    if (this.hw_s1_cmi_q01_choiceInput == "") { this.hw_s1_cmi_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q02_choiceInput == "") { this.hw_s1_cmi_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q03_choiceInput == "") { this.hw_s1_cmi_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q04_choiceInput == "") { this.hw_s1_cmi_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q05_choiceInput == "") { this.hw_s1_cmi_q05_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q06_choiceInput == "") { this.hw_s1_cmi_q06_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q07_choiceInput == "") { this.hw_s1_cmi_q07_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q08_choiceInput == "") { this.hw_s1_cmi_q08_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q09_choiceInput == "") { this.hw_s1_cmi_q09_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q10_choiceInput == "") { this.hw_s1_cmi_q10_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q11_choiceInput == "") { this.hw_s1_cmi_q11_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q01_remarksInput == "") { this.hw_s1_cmi_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q02_remarksInput == "") { this.hw_s1_cmi_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q03_remarksInput == "") { this.hw_s1_cmi_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q04_remarksInput == "") { this.hw_s1_cmi_q04_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q05_remarksInput == "") { this.hw_s1_cmi_q05_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q06_remarksInput == "") { this.hw_s1_cmi_q06_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q07_remarksInput == "") { this.hw_s1_cmi_q07_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q08_remarksInput == "") { this.hw_s1_cmi_q08_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q09_remarksInput == "") { this.hw_s1_cmi_q09_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q10_remarksInput == "") { this.hw_s1_cmi_q10_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q11_remarksInput == "") { this.hw_s1_cmi_q11_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q12_specifyInput == "") { this.hw_s1_cmi_q12_specifyInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s1_cmi_q13_specifyInput == "") { this.hw_s1_cmi_q13_specifyInput = DefaultValues.VALUE_NONE; }

    if (this.cw_s1_cmi_q01_choiceInput == "") { this.cw_s1_cmi_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q02_choiceInput == "") { this.cw_s1_cmi_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q03_choiceInput == "") { this.cw_s1_cmi_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q04_choiceInput == "") { this.cw_s1_cmi_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q05_choiceInput == "") { this.cw_s1_cmi_q05_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q06_choiceInput == "") { this.cw_s1_cmi_q06_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q07_choiceInput == "") { this.cw_s1_cmi_q07_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q08_choiceInput == "") { this.cw_s1_cmi_q08_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q09_choiceInput == "") { this.cw_s1_cmi_q09_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q01_remarksInput == "") { this.cw_s1_cmi_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q02_remarksInput == "") { this.cw_s1_cmi_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q03_remarksInput == "") { this.cw_s1_cmi_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q04_remarksInput == "") { this.cw_s1_cmi_q04_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q05_remarksInput == "") { this.cw_s1_cmi_q05_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q06_remarksInput == "") { this.cw_s1_cmi_q06_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q07_remarksInput == "") { this.cw_s1_cmi_q07_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q08_remarksInput == "") { this.cw_s1_cmi_q08_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q09_remarksInput == "") { this.cw_s1_cmi_q09_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q10_specifyInput == "") { this.cw_s1_cmi_q10_specifyInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s1_cmi_q11_specifyInput == "") { this.cw_s1_cmi_q11_specifyInput = DefaultValues.VALUE_NONE; }

    if (this.e_s1_cmi_q01_choiceInput == "") { this.e_s1_cmi_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q02_choiceInput == "") { this.e_s1_cmi_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q03_choiceInput == "") { this.e_s1_cmi_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q04_choiceInput == "") { this.e_s1_cmi_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q05_choiceInput == "") { this.e_s1_cmi_q05_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q06_choiceInput == "") { this.e_s1_cmi_q06_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q07_choiceInput == "") { this.e_s1_cmi_q07_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q08_choiceInput == "") { this.e_s1_cmi_q08_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q09_choiceInput == "") { this.e_s1_cmi_q09_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q01_remarksInput == "") { this.e_s1_cmi_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q02_remarksInput == "") { this.e_s1_cmi_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q03_remarksInput == "") { this.e_s1_cmi_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q04_remarksInput == "") { this.e_s1_cmi_q04_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q05_remarksInput == "") { this.e_s1_cmi_q05_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q06_remarksInput == "") { this.e_s1_cmi_q06_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q07_remarksInput == "") { this.e_s1_cmi_q07_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q08_remarksInput == "") { this.e_s1_cmi_q08_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q09_remarksInput == "") { this.e_s1_cmi_q09_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q10_specifyInput == "") { this.e_s1_cmi_q10_specifyInput = DefaultValues.VALUE_NONE; }
    if (this.e_s1_cmi_q11_specifyInput == "") { this.e_s1_cmi_q11_specifyInput = DefaultValues.VALUE_NONE; }

    if (this.attendantDetsData[0].name == "") { this.attendantDetsData[0].name = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[0].nricOrFinNo == "") { this.attendantDetsData[0].nricOrFinNo = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[0].role == "") { this.attendantDetsData[0].role = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[0].contactNo == "") { this.attendantDetsData[0].contactNo = DefaultValues.VALUE_NONE; }

    if (this.attendantDetsData[1].name == "") { this.attendantDetsData[1].name = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[1].nricOrFinNo == "") { this.attendantDetsData[1].nricOrFinNo = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[1].role == "") { this.attendantDetsData[1].role = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[1].contactNo == "") { this.attendantDetsData[1].contactNo = DefaultValues.VALUE_NONE; }

    if (this.attendantDetsData[2].name == "") { this.attendantDetsData[2].name = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[2].nricOrFinNo == "") { this.attendantDetsData[2].nricOrFinNo = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[2].role == "") { this.attendantDetsData[2].role = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[2].contactNo == "") { this.attendantDetsData[2].contactNo = DefaultValues.VALUE_NONE; }

    if (this.attendantDetsData[3].name == "") { this.attendantDetsData[3].name = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[3].nricOrFinNo == "") { this.attendantDetsData[3].nricOrFinNo = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[3].role == "") { this.attendantDetsData[3].role = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[3].contactNo == "") { this.attendantDetsData[3].contactNo = DefaultValues.VALUE_NONE; }

    if (this.attendantDetsData[4].name == "") { this.attendantDetsData[4].name = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[4].nricOrFinNo == "") { this.attendantDetsData[4].nricOrFinNo = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[4].role == "") { this.attendantDetsData[4].role = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[4].contactNo == "") { this.attendantDetsData[4].contactNo = DefaultValues.VALUE_NONE; }

    if (this.attendantDetsData[5].name == "") { this.attendantDetsData[5].name = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[5].nricOrFinNo == "") { this.attendantDetsData[5].nricOrFinNo = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[5].role == "") { this.attendantDetsData[5].role = DefaultValues.VALUE_NONE; }
    if (this.attendantDetsData[5].contactNo == "") { this.attendantDetsData[5].contactNo = DefaultValues.VALUE_NONE; }

    if (this.applicantOrganisationNameInput == "") { this.applicantOrganisationNameInput = DefaultValues.VALUE_NONE; }

    dataSource = {
      id: 0,
      ptwId: DefaultValues.VALUE_NONE,
      ptwYear: "",
      locationOfWork: {
        main: this.selectedLocationOfWork,
        sub: this.selectedLocationSector
      },
      permitType: this.selectedPermitType,
      startWorkingDateTime: this.startDateTimeConcat,
      endWorkingDateTime: this.endDateTimeConcat,
      //taskDescription: this.taskDescriptionInput,
      predefinedTask: this.selectedPredefinedTask,
      predefinedTaskOthers: this.predefinedTaskOthersInput,
      noOfWorkers: this.noOfWorkersInput,
      noOfSupervisors: this.noOfSupervisorsInput,
      workAtHeight: {
        sectionOne: {
          controlMeasuresImplemented: {
            q01: {
              choice: this.wah_s1_cmi_q01_choiceInput,
              remarks: this.wah_s1_cmi_q01_remarksInput
            },
            q02: {
              choice: this.wah_s1_cmi_q02_choiceInput,
              remarks: this.wah_s1_cmi_q02_remarksInput
            },
            q03: {
              choice: this.wah_s1_cmi_q03_choiceInput,
              remarks: this.wah_s1_cmi_q03_remarksInput
            },
            q04: {
              choice: this.wah_s1_cmi_q04_choiceInput,
              remarks: this.wah_s1_cmi_q04_remarksInput
            },
            q05: {
              choice: this.wah_s1_cmi_q05_choiceInput,
              remarks: this.wah_s1_cmi_q05_remarksInput
            },
            q06: {
              choice: this.wah_s1_cmi_q06_choiceInput,
              remarks: this.wah_s1_cmi_q06_remarksInput
            },
            q07: {
              choice: this.wah_s1_cmi_q07_choiceInput,
              remarks: this.wah_s1_cmi_q07_remarksInput
            },
            q08: {
              choice: this.wah_s1_cmi_q08_choiceInput,
              remarks: this.wah_s1_cmi_q08_remarksInput
            },
            q09: {
              choice: this.wah_s1_cmi_q09_choiceInput,
              remarks: this.wah_s1_cmi_q09_remarksInput
            },
            q10: {
              choice: this.wah_s1_cmi_q10_choiceInput,
              remarks: this.wah_s1_cmi_q10_remarksInput
            },
            q11: {
              specify: this.wah_s1_cmi_q11_specifyInput
            }
          }
        },
        sectionTwo: {
          assessmentOfControlMeasures: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          },
          siteSurveyFromSupervisor: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          },
          multiLocOrExtentedDuration: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        },
        sectionThree: {
          permitReview: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE, 
              remarks: DefaultValues.VALUE_NONE
            },
            q03: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q04: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        }
      },
      confinedSpace: {
        sectionOne: {
          potentialHazards: {
            atmo: this.cs_s1_ph_atmoInput,
            nonAtmo: this.cs_s1_ph_nonAtmoInput
          },
          controlMeasuresImplemented: {
            preEntryReqs: {
              q01: this.cs_s1_cmi_per_q01_checkedInput,
              q02: this.cs_s1_cmi_per_q02_checkedInput,
              q03: this.cs_s1_cmi_per_q03_checkedInput,
              q04: this.cs_s1_cmi_per_q04_checkedInput,
              q05: this.cs_s1_cmi_per_q05_checkedInput,
              q06: this.cs_s1_cmi_per_q06_checkedInput,
              q07: this.cs_s1_cmi_per_q07_checkedInput,
              q08: this.cs_s1_cmi_per_q08_checkedInput,
            },
            ppe: {
              q01: this.cs_s1_cmi_ppe_q01_checkedInput,
              q02: this.cs_s1_cmi_ppe_q02_checkedInput,
              q03: this.cs_s1_cmi_ppe_q03_checkedInput,
              q04: this.cs_s1_cmi_ppe_q04_checkedInput,
              q05: this.cs_s1_cmi_ppe_q05_checkedInput,
              q06: this.cs_s1_cmi_ppe_q06_checkedInput,
              q07: {
                specify: this.cs_s1_cmi_ppe_q07_specifyInput
              }
            }
          }
        },
        sectionTwo: {
          gasMonitoringRes: {
            oxygenLevel: 0,
            flammableGasLevel: 0,
            toxicGasLevel: 0,
            fitForEntry: false
          }
        },
        sectionThree: {
          permitReview: {
            q01: DefaultValues.VALUE_NONE,
            q02: DefaultValues.VALUE_NONE,
            q03: DefaultValues.VALUE_NONE,
            q04: DefaultValues.VALUE_NONE
          }
        }
      },
      hotWork: {
        sectionOne: {
          controlMeasuresImplemented: {
            q01: {
              choice: this.hw_s1_cmi_q01_choiceInput,
              remarks: this.hw_s1_cmi_q01_remarksInput
            },
            q02: {
              choice: this.hw_s1_cmi_q02_choiceInput,
              remarks: this.hw_s1_cmi_q02_remarksInput
            },
            q03: {
              choice: this.hw_s1_cmi_q03_choiceInput,
              remarks: this.hw_s1_cmi_q03_remarksInput
            },
            q04: {
              choice: this.hw_s1_cmi_q04_choiceInput,
              remarks: this.hw_s1_cmi_q04_remarksInput
            },
            q05: {
              choice: this.hw_s1_cmi_q05_choiceInput,
              remarks: this.hw_s1_cmi_q05_remarksInput
            },
            q06: {
              choice: this.hw_s1_cmi_q06_choiceInput,
              remarks: this.hw_s1_cmi_q06_remarksInput
            },
            q07: {
              choice: this.hw_s1_cmi_q07_choiceInput,
              remarks: this.hw_s1_cmi_q07_remarksInput
            },
            q08: {
              choice: this.hw_s1_cmi_q08_choiceInput,
              remarks: this.hw_s1_cmi_q08_remarksInput
            },
            q09: {
              choice: this.hw_s1_cmi_q09_choiceInput,
              remarks: this.hw_s1_cmi_q09_remarksInput
            },
            q10: {
              choice: this.hw_s1_cmi_q10_choiceInput,
              remarks: this.hw_s1_cmi_q10_remarksInput
            },
            q11: {
              choice: this.hw_s1_cmi_q11_choiceInput,
              remarks: this.hw_s1_cmi_q11_remarksInput
            },
            q12: {
              specify: this.hw_s1_cmi_q12_specifyInput
            },
            q13: {
              specify: this.hw_s1_cmi_q13_specifyInput
            }
          }
        },
        sectionTwo: {
          assessment: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        },
        sectionThree: {
          permitReview: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q03: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q04: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        }
      },
      coldWork: {
        sectionOne: {
          controlMeasuresImplemented: {
            q01: {
              choice: this.cw_s1_cmi_q01_choiceInput,
              remarks: this.cw_s1_cmi_q01_remarksInput
            },
            q02: {
              choice: this.cw_s1_cmi_q02_choiceInput,
              remarks: this.cw_s1_cmi_q02_remarksInput
            },
            q03: {
              choice: this.cw_s1_cmi_q03_choiceInput,
              remarks: this.cw_s1_cmi_q03_remarksInput
            },
            q04: {
              choice: this.cw_s1_cmi_q04_choiceInput,
              remarks: this.cw_s1_cmi_q04_remarksInput
            },
            q05: {
              choice: this.cw_s1_cmi_q05_choiceInput,
              remarks: this.cw_s1_cmi_q05_remarksInput
            },
            q06: {
              choice: this.cw_s1_cmi_q06_choiceInput,
              remarks: this.cw_s1_cmi_q06_remarksInput
            },
            q07: {
              choice: this.cw_s1_cmi_q07_choiceInput,
              remarks: this.cw_s1_cmi_q07_remarksInput
            },
            q08: {
              choice: this.cw_s1_cmi_q08_choiceInput,
              remarks: this.cw_s1_cmi_q08_remarksInput
            },
            q09: {
              choice: this.cw_s1_cmi_q09_choiceInput,
              remarks: this.cw_s1_cmi_q09_remarksInput
            },
            q10: {
              specify: this.cw_s1_cmi_q10_specifyInput
            },
            q11: {
              specify: this.cw_s1_cmi_q11_specifyInput
            }
          }
        },
        sectionTwo: {
          assessment: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        },
        sectionThree: {
          permitReview: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q03: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q04: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        }
      },
      electrical: {
        sectionOne: {
          controlMeasuresImplemented: {
            q01: {
              choice: this.e_s1_cmi_q01_choiceInput,
              remarks: this.e_s1_cmi_q01_remarksInput
            },
            q02: {
              choice: this.e_s1_cmi_q02_choiceInput,
              remarks: this.e_s1_cmi_q02_remarksInput
            },
            q03: {
              choice: this.e_s1_cmi_q03_choiceInput,
              remarks: this.e_s1_cmi_q03_remarksInput
            },
            q04: {
              choice: this.e_s1_cmi_q04_choiceInput,
              remarks: this.e_s1_cmi_q04_remarksInput
            },
            q05: {
              choice: this.e_s1_cmi_q05_choiceInput,
              remarks: this.e_s1_cmi_q05_remarksInput
            },
            q06: {
              choice: this.e_s1_cmi_q06_choiceInput,
              remarks: this.e_s1_cmi_q06_remarksInput
            },
            q07: {
              choice: this.e_s1_cmi_q07_choiceInput,
              remarks: this.e_s1_cmi_q07_remarksInput
            },
            q08: {
              choice: this.e_s1_cmi_q08_choiceInput,
              remarks: this.e_s1_cmi_q08_remarksInput
            },
            q09: {
              choice: this.e_s1_cmi_q09_choiceInput,
              remarks: this.e_s1_cmi_q09_remarksInput
            },
            q10: {
              specify: this.e_s1_cmi_q10_specifyInput
            },
            q11: {
              specify: this.e_s1_cmi_q11_specifyInput
            }
          }
        },
        sectionTwo: {
          assessment: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        },
        sectionThree: {
          permitReview: {
            q01: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q02: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q03: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            },
            q04: {
              choice: DefaultValues.VALUE_NONE,
              remarks: DefaultValues.VALUE_NONE
            }
          }
        }
      },
      attendantDets: [
        {
          id: this.attendantDetsData[0].id,
          name: this.attendantDetsData[0].name,
          nricOrFinNo: this.attendantDetsData[0].nricOrFinNo,
          role: this.attendantDetsData[0].role,
          contactNo: this.attendantDetsData[0].contactNo
        },
        {
          id: this.attendantDetsData[1].id,
          name: this.attendantDetsData[1].name,
          nricOrFinNo: this.attendantDetsData[1].nricOrFinNo,
          role: this.attendantDetsData[1].role,
          contactNo: this.attendantDetsData[1].contactNo
        },
        {
          id: this.attendantDetsData[2].id,
          name: this.attendantDetsData[2].name,
          nricOrFinNo: this.attendantDetsData[2].nricOrFinNo,
          role: this.attendantDetsData[2].role,
          contactNo: this.attendantDetsData[2].contactNo
        },
        {
          id: this.attendantDetsData[3].id,
          name: this.attendantDetsData[3].name,
          nricOrFinNo: this.attendantDetsData[3].nricOrFinNo,
          role: this.attendantDetsData[3].role,
          contactNo: this.attendantDetsData[3].contactNo
        },
        {
          id: this.attendantDetsData[4].id,
          name: this.attendantDetsData[4].name,
          nricOrFinNo: this.attendantDetsData[4].nricOrFinNo,
          role: this.attendantDetsData[4].role,
          contactNo: this.attendantDetsData[4].contactNo
        },
        {
          id: this.attendantDetsData[5].id,
          name: this.attendantDetsData[5].name,
          nricOrFinNo: this.attendantDetsData[5].nricOrFinNo,
          role: this.attendantDetsData[5].role,
          contactNo: this.attendantDetsData[5].contactNo
        },
      ],
      applicantDets: {
        name: this.attendantDetsData[0].name,
        nricOrFinNo: this.attendantDetsData[0].nricOrFinNo,
        orgType: this.selectedApplicantOrganisationType,
        orgName: this.applicantOrganisationNameInput,
        depName: this.applicantDepartmentNameInput,
        contactNo: this.attendantDetsData[0].contactNo,
        email: this.applicantEmailInput
      },
      ptwStatus: {
        permitStatus: PermitStatus.STATUS_PROCESSING,
        taskStatus: TaskStatus.STATUS_NOT_STARTED,
        remarks: DefaultValues.VALUE_NONE,
        checked: false,
        supervisorName: DefaultValues.VALUE_NONE,
        wantToTerminate: false,
        reqTermTimestamp: DefaultValues.VALUE_NONE,
        terminatedTimestamp: DefaultValues.VALUE_NONE,
        timestamp: DefaultValues.VALUE_NONE
      },
      safetyAssessorEvaluation: {
        passed: false,
        name: DefaultValues.VALUE_NONE,
        timestamp: DefaultValues.VALUE_NONE
      },
      authorisedManagerApproval: {
        passed: false,
        name: DefaultValues.VALUE_NONE,
        timestamp: DefaultValues.VALUE_NONE
      },
      requestStatus: RequestStatus.REQUEST_PENDING,
      wantToCancel: false,
      reqCancTimestamp: DefaultValues.VALUE_NONE,
      cancelledTimestamp: DefaultValues.VALUE_NONE,
      timestamp: DefaultValues.VALUE_NONE
    };

    return dataSource;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Open the submission dialog.)
  public openSubmitDialogue(): void {
    const dialogConfig = new MatDialogConfig();
    // * (Send the reqFormData while opening the dialog.)
    dialogConfig.data = this.allocateFormData(this.reqFormData);
    // * (Open the dialog with injected data - reqFormData.)
    this.submitDialogRef = this.dialog.open(SubmitDialogComponent, dialogConfig);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Router navigation without history tracebacks.)
  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

}

// ==============================================================================================================================================================================