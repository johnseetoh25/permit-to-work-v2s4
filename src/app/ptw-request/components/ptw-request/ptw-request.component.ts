import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { createMask } from '@ngneat/input-mask';
import { SubmitDialogComponent } from 'src/app/submit-dialog/components/submit-dialog/submit-dialog.component';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';

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
  public partiallyCompletedPTWData: IPermitToWork = {};


  public errorMessage: string = "Please complete all the required fields.";

  public sectionOneAFormGroup!: FormGroup;
    public selectedPermitType: string = "";

    public selectedLocationOfWork: string = "";

    public taskCoversMultiLocs: boolean = false;
    public otherLocationsInput: string = "";
      public otherLocationsArray: string[] = [];
    
    public startDateInput: Date = new Date();
    public endDateInput: Date = new Date();
      public startDateTimeConcat: Date = new Date();

    public startTimeInput: Date = new Date();
    public endTimeInput: Date = new Date();
      public endDateTimeConcat: Date = new Date();

    public taskDescriptionInput?: string = "";

    public noOfWorkersInput: number = 1;
    public noOfSupervisorsInput: number = 1;
  
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


    public wah_s1_ard_nameInput: string = "";
    public wah_s1_ard_nricOrFinNoInput: string = "";
    public wah_s1_ard_organisationTypeInput: string = "";
    public wah_s1_ard_organisationNameInput: string = "";
    public wah_s1_ard_departmentNameInput: string = "";
    public wah_s1_ard_contactNoInput: string = "";
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

    public cs_s1_ard_nameInput: string = "";
    public cs_s1_ard_nricOrFinNoInput: string = "";
    public cs_s1_ard_organisationTypeInput: string = "";
    public cs_s1_ard_organisationNameInput: string = "";
    public cs_s1_ard_departmentNameInput: string = "";
    public cs_s1_ard_contactNoInput: string = "";
    // ===========================================================================

  public sectionOneCFormGroup!: FormGroup;
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
    public dialogRef: MatDialogRef<SubmitDialogComponent>
  ) { }

  public ngOnInit(): void {
    this.sectionOneAFormGroup = this.formBuilder.group({
      permitType: ["", Validators.required],

      locationOfWork: ["", Validators.required],
      otherLocs: ["", Validators.required],

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


      wah_s1_ard_name: ["", Validators.required],
      wah_s1_ard_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      wah_s1_ard_orgType: ["", Validators.required],
      wah_s1_ard_orgName: ["", Validators.required],
      wah_s1_ard_depName: ["", Validators.required],
      wah_s1_ard_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],
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
      cs_s1_cmi_ppe_q07_specify: ["", Validators.required],

      cs_s1_ard_name: ["", Validators.required],
      cs_s1_ard_nricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      cs_s1_ard_orgType: ["", Validators.required],
      cs_s1_ard_orgName: ["", Validators.required],
      cs_s1_ard_depName: ["", Validators.required],
      cs_s1_ard_contactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],
      // ===========================================================================
    });

    this.sectionOneCFormGroup = this.formBuilder.group({
      aplName: ["", Validators.required],
      aplNricOrFinNo: ["", [ Validators.pattern(/[A-Z]{1}[0-9]{7}[A-Z]{1}/), Validators.required ]],
      aplOrgType: ["", Validators.required],
      aplOrgName: ["", Validators.required],
      aplDepName: ["", Validators.required],
      aplContactNo: ["", [ Validators.pattern(/^\+65 [0-9]{0,4}-[0-9]{0,4}$/), Validators.required ]],
      aplEmail: ["", [ Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), Validators.required ]],
      aplDclChecked: ["", Validators.requiredTrue]
    });

    this.checkMultiLocInputValidator(this.taskCoversMultiLocs);
  }

  public concatStartDateTime(date: Date, time: Date): Date {
    let tempDate = new Date(date.toDateString().concat(", ", time.toString()));
    return tempDate;
  }

  public concatEndDateTime(date: Date, time: Date): Date {
    let tempDate = new Date(date.toDateString().concat(", ", time.toString()));
    return tempDate;
  }

  public checkMultiLocInputValidator(checked: boolean): void {
    if (checked) {
      this.sectionOneAFormGroup.get('otherLocs')?.setValidators(Validators.required);
    } else {
      this.sectionOneAFormGroup.get('otherLocs')?.clearValidators();
    }
    this.sectionOneAFormGroup.get('otherLocs')?.updateValueAndValidity();
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

  public allocateFormData(dataSource: IPermitToWork): IPermitToWork {
    this.startDateTimeConcat = this.concatStartDateTime(this.startDateInput, this.startTimeInput);
    this.endDateTimeConcat = this.concatEndDateTime(this.endDateInput, this.endTimeInput);

    this.otherLocationsArray = this.otherLocationsInput.split(",");

    dataSource = {
      id: 0,
      ptwId: "",
      permitType: this.selectedPermitType,
      locationOfWork: {
        option: this.selectedLocationOfWork,
        other: this.otherLocationsArray
      },
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
          },
          attendantRepDets: {
            attendantRepName: this.wah_s1_ard_nameInput,
            nricOrFinNo: this.wah_s1_ard_nricOrFinNoInput,
            orgType: this.wah_s1_ard_organisationTypeInput,
            orgName: this.wah_s1_ard_organisationNameInput,
            depName: this.wah_s1_ard_departmentNameInput,
            contactNo: this.wah_s1_ard_contactNoInput
          },
          checked: this.applicantDeclarationChecked,
          supervisorName: this.applicantNameInput,
          //timestamp: <Data Alloc On Hold>
        },
        sectionTwo: {
          assessmentOfControlMeasures: {
            q01: {
              choice: "",
              remarks: ""
            },
            q02: {
              choice: "",
              remarks: ""
            }
          },
          siteSurveyFromSupervisor: {
            q01: {
              choice: "",
              remarks: ""
            },
            q02: {
              choice: "",
              remarks: ""
            }
          },
          multiLocOrExtentedDuration: {
            q01: {
              choice: "",
              remarks: ""
            },
            q02: {
              choice: "",
              remarks: ""
            }
          },
          checked: false,
          safetyAssessorName: "",
          //timestamp: <Data Alloc On Hold>
        },
        sectionThree: {
          permitReview: {
            q01: {
              choice: "",
              remarks: ""
            },
            q02: {
              choice: "", 
              remarks: ""
            },
            q03: {
              choice: "",
              remarks: ""
            },
            q04: {
              choice: "",
              remarks: ""
            }
          },
          checked: false,
          authorisedManagerName: "",
          //timestamp: <Data Alloc On Hold>
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
          },
          attendantRepDets: {
            attendantRepName: this.cs_s1_ard_nameInput,
            nricOrFinNo: this.cs_s1_ard_nricOrFinNoInput,
            orgType: this.cs_s1_ard_organisationTypeInput,
            orgName: this.cs_s1_ard_organisationNameInput,
            depName: this.cs_s1_ard_departmentNameInput,
            contactNo: this.cs_s1_ard_contactNoInput
          },
          checked: this.applicantDeclarationChecked,
          supervisorName: this.applicantNameInput,
          //timestamp: <Data Alloc On Hold>
        },
        sectionTwo: {
          gasMonitoringRes: {
            oxygenLevel: 0,
            flammableGasLevel: 0,
            toxicGasLevel: 0,
            fitForEntry: false
          },
          checked: false,
          safetyAssessorName: "",
          //timestamp: <Data Alloc On Hold>
        },
        sectionThree: {
          permitReview: {
            q01: "",
            q02: "",
            q03: "",
            q04: ""
          },
          checked: false,
          authorisedManagerName: "",
          //timestamp: <Data Alloc On Hold>
        }
      },
      applicantDets: {
        name: this.applicantNameInput,
        nricOrFinNo: this.applicantNricOrFinNoInput,
        orgType: this.selectedApplicantOrganisationType,
        orgName: this.applicantOrganisationNameInput,
        depName: this.applicantDepartmentNameInput,
        contactNo: this.applicantContactNoInput,
        email: this.applicantEmailInput
      },
      ptwPost: {
        checked: false,
        supervisorName: "",
        //timestamp: <Data Alloc On Hold>
      },
      ptwStatus: {
        taskStatus: "",
        remarks: "",
        checked: false,
        supervisorName: "",
        //timestamp: <Data Alloc On Hold>
      },
      checked: this.applicantDeclarationChecked,
      dailyEndorsement: { },
      requestStatus: "Pending",
      statusRemarks: "",
      //timestamp: <Data Alloc On Hold>
    };

    return dataSource;
  }

  public openSubmitDialogue(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.allocateFormData(this.partiallyCompletedPTWData);
    this.dialog.open(SubmitDialogComponent, dialogConfig);
  }
}