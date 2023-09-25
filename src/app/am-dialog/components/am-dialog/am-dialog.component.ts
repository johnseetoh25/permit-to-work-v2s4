import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { ValidatorReqdetsComponent } from 'src/app/validator-reqdets/components/validator-reqdets/validator-reqdets.component';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { RequestStatus } from 'src/app/constants/RequestStatus';
import { CompShareService } from 'src/app/services/comp-share.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-am-dialog',
  templateUrl: './am-dialog.component.html',
  styleUrls: ['./am-dialog.component.scss']
})
export class AmDialogComponent implements OnInit {
  public ptwToAuthorise: IPermitToWork = <IPermitToWork>{};

  public radioButtonGroup: string[] = ['Yes', 'No', 'N/A'];

  // ============================ Section II for WAH ============================
  public wah_s3_pr_q01_choiceInput: string = "";
  public wah_s3_pr_q01_remarksInput: string = "";
  public wah_s3_pr_q02_choiceInput: string = "";
  public wah_s3_pr_q02_remarksInput: string = "";
  public wah_s3_pr_q03_choiceInput: string = "";
  public wah_s3_pr_q03_remarksInput: string = "";
  public wah_s3_pr_q04_choiceInput: string = "";
  public wah_s3_pr_q04_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for CS =============================
  public cs_s3_pr_q01_choiceInput: string = "";
  public cs_s3_pr_q02_choiceInput: string = "";
  public cs_s3_pr_q03_choiceInput: string = "";
  public cs_s3_pr_q04_choiceInput: string = "";
  // ============================================================================

  // ============================ Section II for HW =============================
  public hw_s3_pr_q01_choiceInput: string = "";
  public hw_s3_pr_q01_remarksInput: string = "";
  public hw_s3_pr_q02_choiceInput: string = "";
  public hw_s3_pr_q02_remarksInput: string = "";
  public hw_s3_pr_q03_choiceInput: string = "";
  public hw_s3_pr_q03_remarksInput: string = "";
  public hw_s3_pr_q04_choiceInput: string = "";
  public hw_s3_pr_q04_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for CW =============================
  public cw_s3_pr_q01_choiceInput: string = "";
  public cw_s3_pr_q01_remarksInput: string = "";
  public cw_s3_pr_q02_choiceInput: string = "";
  public cw_s3_pr_q02_remarksInput: string = "";
  public cw_s3_pr_q03_choiceInput: string = "";
  public cw_s3_pr_q03_remarksInput: string = "";
  public cw_s3_pr_q04_choiceInput: string = "";
  public cw_s3_pr_q04_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for E ==============================
  public e_s3_pr_q01_choiceInput: string = "";
  public e_s3_pr_q01_remarksInput: string = "";
  public e_s3_pr_q02_choiceInput: string = "";
  public e_s3_pr_q02_remarksInput: string = "";
  public e_s3_pr_q03_choiceInput: string = "";
  public e_s3_pr_q03_remarksInput: string = "";
  public e_s3_pr_q04_choiceInput: string = "";
  public e_s3_pr_q04_remarksInput: string = "";
  // ============================================================================

  public authorisedManagerReviewPassed: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetched: any,
    private dialog: MatDialog,
    private dialogRefSelf: MatDialogRef<AmDialogComponent>,
    private dialogRefVldReqDets: MatDialogRef<ValidatorReqdetsComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private compShare: CompShareService,
    private mail: MailService
  ) { }

  public ngOnInit(): void { }

  public authorisePtw(): void {
    if (this.wah_s3_pr_q01_choiceInput == "") { this.wah_s3_pr_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q01_remarksInput == "") { this.wah_s3_pr_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q02_choiceInput == "") { this.wah_s3_pr_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q02_remarksInput == "") { this.wah_s3_pr_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q03_choiceInput == "") { this.wah_s3_pr_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q03_remarksInput == "") { this.wah_s3_pr_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q04_choiceInput == "") { this.wah_s3_pr_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s3_pr_q04_remarksInput == "") { this.wah_s3_pr_q04_remarksInput = DefaultValues.VALUE_NONE; }

    if (this.cs_s3_pr_q01_choiceInput == "") { this.cs_s3_pr_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s3_pr_q02_choiceInput == "") { this.cs_s3_pr_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s3_pr_q03_choiceInput == "") { this.cs_s3_pr_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cs_s3_pr_q04_choiceInput == "") { this.cs_s3_pr_q04_choiceInput = DefaultValues.VALUE_NONE; }

    if (this.hw_s3_pr_q01_choiceInput == "") { this.hw_s3_pr_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q01_remarksInput == "") { this.hw_s3_pr_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q02_choiceInput == "") { this.hw_s3_pr_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q02_remarksInput == "") { this.hw_s3_pr_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q03_choiceInput == "") { this.hw_s3_pr_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q03_remarksInput == "") { this.hw_s3_pr_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q04_choiceInput == "") { this.hw_s3_pr_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s3_pr_q04_remarksInput == "") { this.hw_s3_pr_q04_remarksInput = DefaultValues.VALUE_NONE; }

    if (this.cw_s3_pr_q01_choiceInput == "") { this.cw_s3_pr_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q01_remarksInput == "") { this.cw_s3_pr_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q02_choiceInput == "") { this.cw_s3_pr_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q02_remarksInput == "") { this.cw_s3_pr_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q03_choiceInput == "") { this.cw_s3_pr_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q03_remarksInput == "") { this.cw_s3_pr_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q04_choiceInput == "") { this.cw_s3_pr_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s3_pr_q04_remarksInput == "") { this.cw_s3_pr_q04_remarksInput = DefaultValues.VALUE_NONE; }

    if (this.e_s3_pr_q01_choiceInput == "") { this.e_s3_pr_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q01_remarksInput == "") { this.e_s3_pr_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q02_choiceInput == "") { this.e_s3_pr_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q02_remarksInput == "") { this.e_s3_pr_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q03_choiceInput == "") { this.e_s3_pr_q03_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q03_remarksInput == "") { this.e_s3_pr_q03_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q04_choiceInput == "") { this.e_s3_pr_q04_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s3_pr_q04_remarksInput == "") { this.e_s3_pr_q04_remarksInput = DefaultValues.VALUE_NONE; }

    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q01.choice = this.wah_s3_pr_q01_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q01.remarks = this.wah_s3_pr_q01_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q02.choice = this.wah_s3_pr_q02_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q02.remarks = this.wah_s3_pr_q02_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q03.choice = this.wah_s3_pr_q03_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q03.remarks = this.wah_s3_pr_q03_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q04.choice = this.wah_s3_pr_q04_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionThree.permitReview.q04.remarks = this.wah_s3_pr_q04_remarksInput;

    this.fetched.ptw[0].confinedSpace.sectionThree.permitReview.q01 = this.cs_s3_pr_q01_choiceInput;
    this.fetched.ptw[0].confinedSpace.sectionThree.permitReview.q02 = this.cs_s3_pr_q02_choiceInput;
    this.fetched.ptw[0].confinedSpace.sectionThree.permitReview.q03 = this.cs_s3_pr_q03_choiceInput;
    this.fetched.ptw[0].confinedSpace.sectionThree.permitReview.q04 = this.cs_s3_pr_q04_choiceInput;

    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q01.choice = this.hw_s3_pr_q01_choiceInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q01.remarks = this.hw_s3_pr_q01_remarksInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q02.choice = this.hw_s3_pr_q02_choiceInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q02.remarks = this.hw_s3_pr_q02_remarksInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q03.choice = this.hw_s3_pr_q03_choiceInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q03.remarks = this.hw_s3_pr_q03_remarksInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q04.choice = this.hw_s3_pr_q04_choiceInput;
    this.fetched.ptw[0].hotWork.sectionThree.permitReview.q04.remarks = this.hw_s3_pr_q04_remarksInput;

    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q01.choice = this.cw_s3_pr_q01_choiceInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q01.remarks = this.cw_s3_pr_q01_remarksInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q02.choice = this.cw_s3_pr_q02_choiceInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q02.remarks = this.cw_s3_pr_q02_remarksInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q03.choice = this.cw_s3_pr_q03_choiceInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q03.remarks = this.cw_s3_pr_q03_remarksInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q04.choice = this.cw_s3_pr_q04_choiceInput;
    this.fetched.ptw[0].coldWork.sectionThree.permitReview.q04.remarks = this.cw_s3_pr_q04_remarksInput;

    this.fetched.ptw[0].electrical.sectionThree.permitReview.q01.choice = this.e_s3_pr_q01_choiceInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q01.remarks = this.e_s3_pr_q01_remarksInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q02.choice = this.e_s3_pr_q02_choiceInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q02.remarks = this.e_s3_pr_q02_remarksInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q03.choice = this.e_s3_pr_q03_choiceInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q03.remarks = this.e_s3_pr_q03_remarksInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q04.choice = this.e_s3_pr_q04_choiceInput;
    this.fetched.ptw[0].electrical.sectionThree.permitReview.q04.remarks = this.e_s3_pr_q04_remarksInput;

    this.fetched.ptw[0].authorisedManagerApproval.name = this.fetched.userName; 

    this.fetched.ptw[0].authorisedManagerApproval.passed = this.authorisedManagerReviewPassed;

    this.fetched.ptw[0].authorisedManagerApproval.timestamp = new Date().toISOString();

    this.fetched.ptw[0].ptwStatus.timestamp = new Date().toISOString();

    if (this.fetched.ptw[0].authorisedManagerApproval.passed) { 
      this.fetched.ptw[0].requestStatus = RequestStatus.REQUEST_APPROVED;
      this.fetched.ptw[0].ptwStatus.permitStatus = PermitStatus.STATUS_VALID;
    } else {
      this.fetched.ptw[0].requestStatus = RequestStatus.REQUEST_REJECTED;
      this.fetched.ptw[0].ptwStatus.permitStatus = PermitStatus.STATUS_INVALID;
    }

    //this.fetched.ptw[0].ptwStatus.taskStatus = TaskStatus.STATUS_IN_PROGRESS;

    this.ptwToAuthorise = this.fetched.ptw[0];

    this.putPtwData(this.ptwToAuthorise);
  }

  public putPtwData(toEvaluate: IPermitToWork): void {
    this.db.update(
      toEvaluate?.id,
      toEvaluate?.ptwId,
      toEvaluate?.ptwYear,
      toEvaluate?.permitType,
      toEvaluate?.locationOfWork?.main,
      toEvaluate?.locationOfWork?.sub,
      toEvaluate?.startWorkingDateTime,
      toEvaluate?.endWorkingDateTime,
      //toEvaluate?.taskDescription,
      toEvaluate?.predefinedTask,
      toEvaluate?.predefinedTaskOthers,
      toEvaluate?.noOfWorkers,
      toEvaluate?.noOfSupervisors,

      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toEvaluate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toEvaluate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
      toEvaluate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
      toEvaluate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
      toEvaluate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

      toEvaluate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
      toEvaluate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
      toEvaluate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
      toEvaluate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

      toEvaluate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
      toEvaluate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
      toEvaluate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
      toEvaluate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
      toEvaluate?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

      toEvaluate?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
      toEvaluate?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
      toEvaluate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

      toEvaluate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
      toEvaluate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
      toEvaluate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
      toEvaluate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

      toEvaluate?.confinedSpace?.sectionThree?.permitReview?.q01,
      toEvaluate?.confinedSpace?.sectionThree?.permitReview?.q02,
      toEvaluate?.confinedSpace?.sectionThree?.permitReview?.q03,
      toEvaluate?.confinedSpace?.sectionThree?.permitReview?.q04,

      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
      toEvaluate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

      toEvaluate?.hotWork?.sectionTwo?.assessment?.q01?.choice,
      toEvaluate?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

      toEvaluate?.hotWork?.sectionThree?.permitReview?.q01?.choice,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q02?.choice,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q03?.choice,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q04?.choice,
      toEvaluate?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toEvaluate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toEvaluate?.coldWork?.sectionTwo?.assessment?.q01?.choice,
      toEvaluate?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

      toEvaluate?.coldWork?.sectionThree?.permitReview?.q01?.choice,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q02?.choice,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q03?.choice,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q04?.choice,
      toEvaluate?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toEvaluate?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toEvaluate?.electrical?.sectionTwo?.assessment?.q01?.choice,
      toEvaluate?.electrical?.sectionTwo?.assessment?.q01?.remarks,

      toEvaluate?.electrical?.sectionThree?.permitReview?.q01?.choice,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q01?.remarks,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q02?.choice,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q02?.remarks,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q03?.choice,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q03?.remarks,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q04?.choice,
      toEvaluate?.electrical?.sectionThree?.permitReview?.q04?.remarks,

      toEvaluate?.attendantDets?.[0].name,
      toEvaluate?.attendantDets?.[0].nricOrFinNo,
      toEvaluate?.attendantDets?.[0].role,
      toEvaluate?.attendantDets?.[0].contactNo,

      toEvaluate?.attendantDets?.[1].name,
      toEvaluate?.attendantDets?.[1].nricOrFinNo,
      toEvaluate?.attendantDets?.[1].role,
      toEvaluate?.attendantDets?.[1].contactNo,

      toEvaluate?.attendantDets?.[2].name,
      toEvaluate?.attendantDets?.[2].nricOrFinNo,
      toEvaluate?.attendantDets?.[2].role,
      toEvaluate?.attendantDets?.[2].contactNo,

      toEvaluate?.attendantDets?.[3].name,
      toEvaluate?.attendantDets?.[3].nricOrFinNo,
      toEvaluate?.attendantDets?.[3].role,
      toEvaluate?.attendantDets?.[3].contactNo,

      toEvaluate?.attendantDets?.[4].name,
      toEvaluate?.attendantDets?.[4].nricOrFinNo,
      toEvaluate?.attendantDets?.[4].role,
      toEvaluate?.attendantDets?.[4].contactNo,

      toEvaluate?.attendantDets?.[5].name,
      toEvaluate?.attendantDets?.[5].nricOrFinNo,
      toEvaluate?.attendantDets?.[5].role,
      toEvaluate?.attendantDets?.[5].contactNo,

      toEvaluate?.applicantDets?.name,
      toEvaluate?.applicantDets?.nricOrFinNo,
      toEvaluate?.applicantDets?.orgType,
      toEvaluate?.applicantDets?.orgName,
      toEvaluate?.applicantDets?.depName,
      toEvaluate?.applicantDets?.contactNo,
      toEvaluate?.applicantDets?.email,

      toEvaluate?.ptwStatus?.permitStatus,
      toEvaluate?.ptwStatus?.taskStatus,
      toEvaluate?.ptwStatus?.remarks,
      toEvaluate?.ptwStatus?.checked,
      toEvaluate?.ptwStatus?.supervisorName,
      toEvaluate?.ptwStatus?.wantToTerminate,
      toEvaluate?.ptwStatus?.reqTermTimestamp,
      toEvaluate?.ptwStatus?.terminatedTimestamp,
      toEvaluate?.ptwStatus?.timestamp,

      toEvaluate?.safetyAssessorEvaluation?.passed,
      toEvaluate?.safetyAssessorEvaluation?.name,
      toEvaluate?.safetyAssessorEvaluation?.timestamp,

      toEvaluate?.authorisedManagerApproval?.passed,
      toEvaluate?.authorisedManagerApproval?.name,
      toEvaluate?.authorisedManagerApproval?.timestamp,

      toEvaluate?.requestStatus,
      toEvaluate?.wantToCancel,
      toEvaluate?.reqCancTimestamp,
      toEvaluate?.cancelledTimestamp,
      toEvaluate?.timestamp
    );

    // * (Emit a click event signalling to do something to any comp subbed to this emitter.)
    this.compShare.sendClickEvent();
    this.dialogRefSelf.close();
    // * (Send email notif regarding the action.)
    this.db.fetchWith("id", toEvaluate.id.toString()).subscribe((resp: IPermitToWork[]) => {
      this.mail.send(resp[0], resp[0].permitType);
    });
    this.openSnackBar("The permit has been " + toEvaluate.requestStatus.toLowerCase() + ". An email notification will be sent to you shortly.", "");

    // this.dialogRefSelf.close();
    // this.dialogRefSelf.afterClosed().subscribe(() => {
    //   // * (Send email notif regarding the action.)
    //   this.db.fetchWith("id", toEvaluate.id.toString()).subscribe((resp: IPermitToWork[]) => {
    //     //this.mail.send(resp[0], resp[0].permitType);
    //   });
    //   this.openSnackBar("The permit has been " + toEvaluate.requestStatus.toLowerCase() + ". An email notification will be sent to you shortly.", "");
    // });
    // this.dialogRefVldReqDets.afterClosed().subscribe(() => {
    //   this.compShare.sendClickEvent();
    // });
  }

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}