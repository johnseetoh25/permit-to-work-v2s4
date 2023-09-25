import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { ValidatorReqdetsComponent } from 'src/app/validator-reqdets/components/validator-reqdets/validator-reqdets.component';
import { CompShareService } from 'src/app/services/comp-share.service';

@Component({
  selector: 'app-sa-dialog',
  templateUrl: './sa-dialog.component.html',
  styleUrls: ['./sa-dialog.component.scss']
})
export class SaDialogComponent implements OnInit {
  public ptwToEvaluate: IPermitToWork = <IPermitToWork>{};

  public radioButtonGroup: string[] = ['Yes', 'No', 'N/A'];

  // ============================ Section II for WAH ============================
  public wah_s2_acm_q01_choiceInput: string = "";
  public wah_s2_acm_q01_remarksInput: string = "";
  public wah_s2_acm_q02_choiceInput: string = "";
  public wah_s2_acm_q02_remarksInput: string = "";

  public wah_s2_ssfs_q01_choiceInput: string = "";
  public wah_s2_ssfs_q01_remarksInput: string = "";
  public wah_s2_ssfs_q02_choiceInput: string = "";
  public wah_s2_ssfs_q02_remarksInput: string = "";

  public wah_s2_mloed_q01_choiceInput: string = "";
  public wah_s2_mloed_q01_remarksInput: string = "";
  public wah_s2_mloed_q02_choiceInput: string = "";
  public wah_s2_mloed_q02_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for CS =============================
  public cs_s2_gmr_oxygenLevelInput: number = 0;
  public cs_s2_gmr_flammableGasLevelInput: number = 0;
  public cs_s2_gmr_toxicGasLevelInput: number = 0;
  public cs_s2_gmr_fitForEntryInput: boolean = false;
  // ============================================================================

  // ============================ Section II for HW =============================
  public hw_s2_a_q01_choiceInput: string = "";
  public hw_s2_a_q01_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for CW =============================
  public cw_s2_a_q01_choiceInput: string = "";
  public cw_s2_a_q01_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for E ==============================
  public e_s2_a_q01_choiceInput: string = "";
  public e_s2_a_q01_remarksInput: string = "";
  // ============================================================================

  public safetyAssessorEvaluationPassed: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetched: any,
    private dialog: MatDialog,
    private dialogRefSelf: MatDialogRef<SaDialogComponent>,
    private dialogRefVldReqDets: MatDialogRef<ValidatorReqdetsComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private compShare: CompShareService
  ) { }

  public ngOnInit(): void { }

  public evaluatePtw(): void {
    if (this.wah_s2_acm_q01_choiceInput == "") {  this.wah_s2_acm_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_acm_q01_remarksInput == "") {  this.wah_s2_acm_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_acm_q02_choiceInput == "") {  this.wah_s2_acm_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_acm_q02_remarksInput == "") {  this.wah_s2_acm_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_ssfs_q01_choiceInput == "") {  this.wah_s2_ssfs_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_ssfs_q01_remarksInput == "") {  this.wah_s2_ssfs_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_ssfs_q02_choiceInput == "") {  this.wah_s2_ssfs_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_ssfs_q02_remarksInput == "") {  this.wah_s2_ssfs_q02_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_mloed_q01_choiceInput == "") {  this.wah_s2_mloed_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_mloed_q01_remarksInput == "") {  this.wah_s2_mloed_q01_remarksInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_mloed_q02_choiceInput == "") {  this.wah_s2_mloed_q02_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.wah_s2_mloed_q02_remarksInput == "") {  this.wah_s2_mloed_q02_remarksInput = DefaultValues.VALUE_NONE; }

    if (this.hw_s2_a_q01_choiceInput == "") {  this.hw_s2_a_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.hw_s2_a_q01_remarksInput == "") {  this.hw_s2_a_q01_remarksInput = DefaultValues.VALUE_NONE; }

    if (this.cw_s2_a_q01_choiceInput == "") {  this.cw_s2_a_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.cw_s2_a_q01_remarksInput == "") {  this.cw_s2_a_q01_remarksInput = DefaultValues.VALUE_NONE; }

    if (this.e_s2_a_q01_choiceInput == "") {  this.e_s2_a_q01_choiceInput = DefaultValues.VALUE_NONE; }
    if (this.e_s2_a_q01_remarksInput == "") {  this.e_s2_a_q01_remarksInput = DefaultValues.VALUE_NONE; }

    this.fetched.ptw[0].workAtHeight.sectionTwo.assessmentOfControlMeasures.q01.choice = this.wah_s2_acm_q01_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.assessmentOfControlMeasures.q01.remarks = this.wah_s2_acm_q01_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.assessmentOfControlMeasures.q02.choice = this.wah_s2_acm_q02_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.assessmentOfControlMeasures.q02.remarks = this.wah_s2_acm_q02_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.siteSurveyFromSupervisor.q01.choice = this.wah_s2_ssfs_q01_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.siteSurveyFromSupervisor.q01.remarks = this.wah_s2_ssfs_q01_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.siteSurveyFromSupervisor.q02.choice = this.wah_s2_ssfs_q02_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.siteSurveyFromSupervisor.q02.remarks = this.wah_s2_ssfs_q02_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.multiLocOrExtentedDuration.q01.choice = this.wah_s2_mloed_q01_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.multiLocOrExtentedDuration.q01.remarks = this.wah_s2_mloed_q01_remarksInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.multiLocOrExtentedDuration.q02.choice = this.wah_s2_mloed_q02_choiceInput;
    this.fetched.ptw[0].workAtHeight.sectionTwo.multiLocOrExtentedDuration.q02.remarks = this.wah_s2_mloed_q02_remarksInput;

    this.fetched.ptw[0].confinedSpace.sectionTwo.gasMonitoringRes.oxygenLevel = this.cs_s2_gmr_oxygenLevelInput;
    this.fetched.ptw[0].confinedSpace.sectionTwo.gasMonitoringRes.flammableGasLevel = this.cs_s2_gmr_flammableGasLevelInput;
    this.fetched.ptw[0].confinedSpace.sectionTwo.gasMonitoringRes.toxicGasLevel = this.cs_s2_gmr_toxicGasLevelInput;
    this.fetched.ptw[0].confinedSpace.sectionTwo.gasMonitoringRes.fitForEntry = this.cs_s2_gmr_fitForEntryInput;

    this.fetched.ptw[0].hotWork.sectionTwo.assessment.q01.choice = this.hw_s2_a_q01_choiceInput;
    this.fetched.ptw[0].hotWork.sectionTwo.assessment.q01.remarks = this.hw_s2_a_q01_remarksInput;

    this.fetched.ptw[0].coldWork.sectionTwo.assessment.q01.choice = this.cw_s2_a_q01_choiceInput;
    this.fetched.ptw[0].coldWork.sectionTwo.assessment.q01.remarks = this.cw_s2_a_q01_remarksInput;

    this.fetched.ptw[0].electrical.sectionTwo.assessment.q01.choice = this.e_s2_a_q01_choiceInput;
    this.fetched.ptw[0].electrical.sectionTwo.assessment.q01.remarks = this.e_s2_a_q01_remarksInput;

    this.fetched.ptw[0].safetyAssessorEvaluation.name = this.fetched.userName; 

    this.fetched.ptw[0].safetyAssessorEvaluation.passed = this.safetyAssessorEvaluationPassed;

    this.fetched.ptw[0].safetyAssessorEvaluation.timestamp = new Date().toISOString();

    this.ptwToEvaluate = this.fetched.ptw[0];

    this.putPtwData(this.ptwToEvaluate);
    
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
      toEvaluate?.timestamp,
    );

    
    this.dialogRefSelf.close();
    this.openSnackBar("The permit has been evaluated. Please proceed to approval/rejection.", "");
    this.compShare.sendClickEvent();

    // this.dialogRefSelf.close();
    // this.dialogRefSelf.afterClosed().subscribe(() => {
    //   this.openSnackBar("The permit has been evaluated. Please proceed to approval/rejection.", "");
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
