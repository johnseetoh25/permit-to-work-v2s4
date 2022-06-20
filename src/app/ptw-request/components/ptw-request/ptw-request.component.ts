import { Component, OnInit, ViewChild } from '@angular/core';
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
export class PtwRequestComponent implements OnInit {
  public partiallyCompletedPTWData!: IPermitToWork;

  public errorMessage: string = "Please complete all the required fields.";

  public sectionOneAFormGroup!: FormGroup;
    public selectedLocationOfWork: string = "";
    public selectedLocationSector: string = "";

    public selectedPermitType: string = "";

    public taskCoversMultiLocs: boolean = false;
    public otherLocationsInput: string = "";
    
    public startDateInput: Date = new Date();
    public endDateInput: Date = new Date();
      public startDateTimeConcat: string = "";

    public startTimeInput: Date = new Date();
    public endTimeInput: Date = new Date();
      public endDateTimeConcat: string = "";

    public taskDescriptionInput: string = "";

    public totalNoOfAttendants: number = 0;
      public noOfWorkersEventValue: number = 1;
        public noOfWorkersInput: number = 0;
      public noOfSupervisorsEventValue: number = 1;
        public noOfSupervisorsInput: number = 0;
  
  public radioButtonGroup: string[] = ['Yes', 'No', 'N/A'];
  public radioButtonGroupAlt: string[] = ['Yes', 'No'];

  public nricOrFinNoInputMask = createMask("A9999999A");
  public contactNoInputMask = createMask("+65 9999-9999");

  public sectionOneBFormGroup!: FormGroup;
    // ============================ Section I(B) for WAH ============================
    public wah_s1_cmi_q01_choiceInput: string = "";
    public wah_s1_cmi_q01_remarksInput: string = "";

    public wah_s1_cmi_q02_choiceInput: string = "";
    public wah_s1_cmi_q02_remarksInput: string = "";

    public wah_s1_cmi_q03_choiceInput: string = "";
    public wah_s1_cmi_q03_remarksInput: string = "";

    public wah_s1_cmi_q04_choiceInput: string = "";
    public wah_s1_cmi_q04_remarksInput: string = "";

    public wah_s1_cmi_q05_choiceInput: string = "";
    public wah_s1_cmi_q05_remarksInput: string = "";

    public wah_s1_cmi_q06_choiceInput: string = "";
    public wah_s1_cmi_q06_remarksInput: string = "";

    public wah_s1_cmi_q07_choiceInput: string = "";
    public wah_s1_cmi_q07_remarksInput: string = "";

    public wah_s1_cmi_q08_choiceInput: string = "";
    public wah_s1_cmi_q08_remarksInput: string = "";

    public wah_s1_cmi_q09_choiceInput: string = "";
    public wah_s1_cmi_q09_remarksInput: string = "";

    public wah_s1_cmi_q10_choiceInput: string = "";
    public wah_s1_cmi_q10_remarksInput: string = "";

    public wah_s1_cmi_q11_specifyInput: string = "";
    // ===========================================================================

    // ============================ Section I(B) for CS =============================
    public cs_s1_ph_atmoInput: string = "";
    public cs_s1_ph_nonAtmoInput: string = "";

    public cs_s1_cmi_per_q01_checkedInput: string = "";
    public cs_s1_cmi_per_q02_checkedInput: string = "";
    public cs_s1_cmi_per_q03_checkedInput: string = "";
    public cs_s1_cmi_per_q04_checkedInput: string = "";
    public cs_s1_cmi_per_q05_checkedInput: string = "";
    public cs_s1_cmi_per_q06_checkedInput: string = "";
    public cs_s1_cmi_per_q07_checkedInput: string = "";
    public cs_s1_cmi_per_q08_checkedInput: string = "";

    public cs_s1_cmi_ppe_q01_checkedInput: string = "";
    public cs_s1_cmi_ppe_q02_checkedInput: string = "";
    public cs_s1_cmi_ppe_q03_checkedInput: string = "";
    public cs_s1_cmi_ppe_q04_checkedInput: string = "";
    public cs_s1_cmi_ppe_q05_checkedInput: string = "";
    public cs_s1_cmi_ppe_q06_checkedInput: string = "";
    public cs_s1_cmi_ppe_q07_specifyInput: string = "";
    // ===========================================================================

  public sectionOneCFormGroup!: FormGroup;
    public displayedHeaderColumns: string[] = [
      "id",
      "name",
      "nricOrFinNo",
      "contactNo"
    ];
    public attendantDetsData: Array<AttendantDets> = [
      {
        id: 1,
        name: "",
        nricOrFinNo: "",
        contactNo: ""
      },
      {
        id: 2,
        name: "",
        nricOrFinNo: "",
        contactNo: ""
      },
      {
        id: 3,
        name: "",
        nricOrFinNo: "",
        contactNo: ""
      },
      {
        id: 4,
        name: "",
        nricOrFinNo: "",
        contactNo: ""
      },
      {
        id: 5,
        name: "",
        nricOrFinNo: "",
        contactNo: ""
      }
    ];

    public setNoOfWorkers(value: any) {
      this.noOfWorkersInput = value;
      console.log("New no. of workers: ", this.noOfWorkersInput);
    }

    public setNoOfSupervisors(value: any) {
      this.noOfSupervisorsInput = value;
      console.log("New no. of supervisors: ", this.noOfSupervisorsInput);
    }

    public calcNoOfTableRowDisplayed(): number {
      var total: number = Math.abs(this.noOfWorkersInput + (this.noOfSupervisorsInput - 1));
      console.log("Total number of row: ", total);
      return total;
    }

    public applicantNameInput: string = "";
    public applicantNricOrFinNoInput: string = "";
      
    public selectedApplicantOrganisationType: string = "";
    public applicantOrganisationNameInput: string = "";
    public applicantDepartmentNameInput: string = "";
    public applicantContactNoInput: string = "";
      
    public applicantEmailInput: string = "";
    public applicantEmailInputMask = createMask({ alias: "email" });
    public applicantDeclarationChecked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog, 
    public submitDialogRef: MatDialogRef<SubmitDialogComponent>,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.setNoOfWorkers(this.noOfSupervisorsEventValue);
    this.setNoOfSupervisors(this.noOfSupervisorsEventValue);
    this.totalNoOfAttendants = this.calcNoOfTableRowDisplayed();

    this.sectionOneAFormGroup = this.formBuilder.group({
      locationOfWork: ["", Validators.required],
      locationSector: ["", Validators.required],

      permitType: ["", Validators.required],

      startDate: ["", Validators.required],
      startTime: ["", Validators.required],

      endDate: ["", Validators.required],
      endTime: ["", Validators.required],

      taskDesc: ["", Validators.required],

      noOfWorkers: ["", Validators.required],
      noOfSpvs: ["", Validators.required]
    });

    this.sectionOneBFormGroup = this.formBuilder.group({
      // ============================ Section I(B) for WAH ============================
      wah_s1_cmi_q01_choice: ["", Validators.required],
      wah_s1_cmi_q01_remarks: [],

      wah_s1_cmi_q02_choice: ["", Validators.required],
      wah_s1_cmi_q02_remarks: [],

      wah_s1_cmi_q03_choice: ["", Validators.required],
      wah_s1_cmi_q03_remarks: [],

      wah_s1_cmi_q04_choice: ["", Validators.required],
      wah_s1_cmi_q04_remarks: [],

      wah_s1_cmi_q05_choice: ["", Validators.required],
      wah_s1_cmi_q05_remarks: [],

      wah_s1_cmi_q06_choice: ["", Validators.required],
      wah_s1_cmi_q06_remarks: [],

      wah_s1_cmi_q07_choice: ["", Validators.required],
      wah_s1_cmi_q07_remarks: [],

      wah_s1_cmi_q08_choice: ["", Validators.required],
      wah_s1_cmi_q08_remarks: [],

      wah_s1_cmi_q09_choice: ["", Validators.required],
      wah_s1_cmi_q09_remarks: [],

      wah_s1_cmi_q10_choice: ["", Validators.required],
      wah_s1_cmi_q10_remarks: [],

      wah_s1_cmi_q11_specify: ["", Validators.required],
      // ===========================================================================

      // ============================ Section I(B) for CS =============================
      cs_s1_ph_atmo: ["", Validators.required],
      cs_s1_ph_nonAtmo: ["", Validators.required],

      cs_s1_cmi_per_q01_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q02_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q03_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q04_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q05_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q06_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q07_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_per_q08_checked: ["", Validators.requiredTrue],

      cs_s1_cmi_ppe_q01_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_ppe_q02_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_ppe_q03_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_ppe_q04_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_ppe_q05_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_ppe_q06_checked: ["", Validators.requiredTrue],
      cs_s1_cmi_ppe_q07_specify: ["", Validators.required]
      // ===========================================================================
    });

    this.sectionOneCFormGroup = this.formBuilder.group({
      // Attendant details
      ad1_name: ["", Validators.required],
      ad1_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      ad1_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],

      ad2_name: ["", Validators.required],
      ad2_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      ad2_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],

      ad3_name: ["", Validators.required],
      ad3_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      ad3_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],

      ad4_name: ["", Validators.required],
      ad4_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      ad4_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],

      ad5_name: ["", Validators.required],
      ad5_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      ad5_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],


      // Applicant / supervisor details
      aplName: ["", Validators.required],
      aplNricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      aplOrgType: ["", Validators.required],
      aplOrgName: ["", Validators.required],
      aplDepName: ["", Validators.required],
      aplContactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],
      aplEmail: ["", [ Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), Validators.required ]],
      aplDclChecked: ["", Validators.requiredTrue],
    });

    this.toggleAttendantDetsTableRowValidator(this.totalNoOfAttendants);
  }

  public concatStartDateTime(date: Date, time: Date): string {
    let tempDate = new Date(date.toDateString().concat(", ", time.toString()));
    let tempDateString = tempDate.toISOString();
    return tempDateString;
  }

  public concatEndDateTime(date: Date, time: Date): string {
    let tempDate = new Date(date.toDateString().concat(", ", time.toString()));
    let tempDateString = tempDate.toISOString();
    return tempDateString;
  }

  public togglePTWFormValidators(value: string): void {
    switch (value) {
      case 'Work at height':
        this.setRequiredAllWahValidators();
        this.clearAllCsValidators();

        break;
      case 'Confined space':
        this.setRequiredAllCsValidators();
        this.clearAllWahValidators();

        break;
      default:
        this.clearAllWahValidators();
        this.clearAllCsValidators();
    }

    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_choice')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_remarks')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q11_specify')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('wah_s1_ard_name')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_ard_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_ard_orgType')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_ard_orgName')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_ard_depName')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('wah_s1_ard_contactNo')?.updateValueAndValidity();


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
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q07_specify')?.updateValueAndValidity();

    this.sectionOneBFormGroup.get('cs_s1_ard_name')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ard_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ard_orgType')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ard_orgName')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ard_depName')?.updateValueAndValidity();
    this.sectionOneBFormGroup.get('cs_s1_ard_contactNo')?.updateValueAndValidity();
  }

  private setRequiredAllWahValidators(): void {
    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q01_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q02_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q03_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q04_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q05_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q06_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q07_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q08_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q09_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_choice')?.setValidators(Validators.required);
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q10_remarks')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_cmi_q11_specify')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('wah_s1_ard_name')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_ard_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
    this.sectionOneBFormGroup.get('wah_s1_ard_orgType')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_ard_orgName')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_ard_depName')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('wah_s1_ard_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);
  }

  private clearAllWahValidators(): void {
    this.sectionOneBFormGroup.get('wah_s1_cmi_q01_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q01_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q02_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q02_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q03_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q03_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q04_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q04_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q05_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q05_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q06_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q06_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q07_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q07_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q08_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q08_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q09_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q09_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q10_choice')?.clearValidators();
    //this.sectionOneBFormGroup.get('wah_s1_cmi_q10_remarks')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_cmi_q11_specify')?.clearValidators();

    this.sectionOneBFormGroup.get('wah_s1_ard_name')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_ard_nricOrFinNo')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_ard_orgType')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_ard_orgName')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_ard_depName')?.clearValidators();
    this.sectionOneBFormGroup.get('wah_s1_ard_contactNo')?.clearValidators();
  }

  private setRequiredAllCsValidators(): void {
    this.sectionOneBFormGroup.get('cs_s1_ph_atmo')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_ph_nonAtmo')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q01_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q02_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q03_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q04_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q05_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q06_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q07_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_per_q08_checked')?.setValidators(Validators.requiredTrue);

    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q01_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q02_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q03_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q04_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q05_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q06_checked')?.setValidators(Validators.requiredTrue);
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q07_specify')?.setValidators(Validators.required);

    this.sectionOneBFormGroup.get('cs_s1_ard_name')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_ard_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
    this.sectionOneBFormGroup.get('cs_s1_ard_orgType')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_ard_orgName')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_ard_depName')?.setValidators(Validators.required);
    this.sectionOneBFormGroup.get('cs_s1_ard_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);
  }

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
    this.sectionOneBFormGroup.get('cs_s1_cmi_ppe_q07_specify')?.clearValidators();

    this.sectionOneBFormGroup.get('cs_s1_ard_name')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_ard_nricOrFinNo')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_ard_orgType')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_ard_orgName')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_ard_depName')?.clearValidators();
    this.sectionOneBFormGroup.get('cs_s1_ard_contactNo')?.clearValidators();
  }

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

  public toggleArdOrgNameValidator(permitType: string, orgType : string) : void {
    switch (permitType) {
      case 'Work at height (WAH)':
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
      case 'Confined space (CS)':
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

  public toggleAttendantDetsTableRowValidator(total: number): void {
    switch (total) {
      case 1:
        console.log("ONE");

        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad2_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad2_contactNo')?.clearValidators();

        this.sectionOneCFormGroup.get('ad3_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_contactNo')?.clearValidators();

        this.sectionOneCFormGroup.get('ad4_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_contactNo')?.clearValidators();

        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();

        break;

      case 2:
        console.log("TWO");

        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad3_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad3_contactNo')?.clearValidators();

        this.sectionOneCFormGroup.get('ad4_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_contactNo')?.clearValidators();

        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();

        break;
      
      case 3:
        console.log("THREE");

        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad4_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad4_contactNo')?.clearValidators();

        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();

        break;

      case 4:
        console.log("FOUR");

        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad4_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad4_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad5_name')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.clearValidators();
        this.sectionOneCFormGroup.get('ad5_contactNo')?.clearValidators();

        break;

      case 5:
        console.log("FIVE");

        this.sectionOneCFormGroup.get('ad1_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad1_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad2_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad2_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad3_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad3_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad4_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad4_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);

        this.sectionOneCFormGroup.get('ad5_name')?.setValidators(Validators.required);
        this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.setValidators([ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]);
        this.sectionOneCFormGroup.get('ad5_contactNo')?.setValidators([ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]);
    
        break;
      }

    this.sectionOneCFormGroup.get('ad1_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad1_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad1_contactNo')?.updateValueAndValidity();

    this.sectionOneCFormGroup.get('ad2_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad2_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad2_contactNo')?.updateValueAndValidity();

    this.sectionOneCFormGroup.get('ad3_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad3_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad3_contactNo')?.updateValueAndValidity();

    this.sectionOneCFormGroup.get('ad4_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad4_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad4_contactNo')?.updateValueAndValidity();

    this.sectionOneCFormGroup.get('ad5_name')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad5_nricOrFinNo')?.updateValueAndValidity();
    this.sectionOneCFormGroup.get('ad5_contactNo')?.updateValueAndValidity();
  }

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

    if (this.applicantOrganisationNameInput == "") { this.applicantOrganisationNameInput = DefaultValues.VALUE_NONE; }

    dataSource = {
      id: 0,
      ptwId: DefaultValues.VALUE_NONE,
      locationOfWork: {
        main: this.selectedLocationOfWork,
        sub: this.selectedLocationSector
      },
      permitType: this.selectedPermitType,
      startWorkingDateTime: this.startDateTimeConcat,
      endWorkingDateTime: this.endDateTimeConcat,
      taskDescription: this.taskDescriptionInput,
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
      attendantDets: [
        {
          id: this.attendantDetsData[0].id,
          name: this.attendantDetsData[0].name,
          nricOrFinNo: this.attendantDetsData[0].nricOrFinNo,
          contactNo: this.attendantDetsData[0].contactNo
        },
        {
          id: this.attendantDetsData[1].id,
          name: this.attendantDetsData[1].name,
          nricOrFinNo: this.attendantDetsData[1].nricOrFinNo,
          contactNo: this.attendantDetsData[1].contactNo
        },
        {
          id: this.attendantDetsData[2].id,
          name: this.attendantDetsData[2].name,
          nricOrFinNo: this.attendantDetsData[2].nricOrFinNo,
          contactNo: this.attendantDetsData[2].contactNo
        },
        {
          id: this.attendantDetsData[3].id,
          name: this.attendantDetsData[3].name,
          nricOrFinNo: this.attendantDetsData[3].nricOrFinNo,
          contactNo: this.attendantDetsData[3].contactNo
        },
        {
          id: this.attendantDetsData[4].id,
          name: this.attendantDetsData[4].name,
          nricOrFinNo: this.attendantDetsData[4].nricOrFinNo,
          contactNo: this.attendantDetsData[4].contactNo
        },
      ],
      applicantDets: {
        name: this.applicantNameInput,
        nricOrFinNo: this.applicantNricOrFinNoInput,
        orgType: this.selectedApplicantOrganisationType,
        orgName: this.applicantOrganisationNameInput,
        depName: this.applicantDepartmentNameInput,
        contactNo: this.applicantContactNoInput,
        email: this.applicantEmailInput
      },
      dailyEndorsement: { },
      ptwStatus: {
        permitStatus: PermitStatus.STATUS_YET_INVALID,
        taskStatus: TaskStatus.STATUS_NOT_STARTED,
        remarks: DefaultValues.VALUE_NONE,
        checked: false,
        supervisorName: DefaultValues.VALUE_NONE,
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
      checked: this.applicantDeclarationChecked,
      requestStatus: RequestStatus.REQUEST_PENDING,
      statusRemarks: DefaultValues.VALUE_NONE,
      timestamp: DefaultValues.VALUE_NONE
    };

    return dataSource;
  }

  public openSubmitDialogue(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.allocateFormData(this.partiallyCompletedPTWData);
    this.submitDialogRef = this.dialog.open(SubmitDialogComponent, dialogConfig);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}