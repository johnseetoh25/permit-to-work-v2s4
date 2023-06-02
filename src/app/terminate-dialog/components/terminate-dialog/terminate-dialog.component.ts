// ==============================================================================================================================================================================

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { TaskStatus } from 'src/app/constants/TaskStatus';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { CompShareService } from 'src/app/services/comp-share.service';
import { RequestStatus } from 'src/app/constants/RequestStatus';
import { MailService } from 'src/app/services/mail.service';

// ==============================================================================================================================================================================

@Component({
  selector: 'app-terminate-dialog',
  templateUrl: './terminate-dialog.component.html',
  styleUrls: ['./terminate-dialog.component.scss']
})

// ==============================================================================================================================================================================

export class TerminateDialogComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Empty permit object to terminate.)
  public ptwToCloseOrTerminate: IPermitToWork = <IPermitToWork>{};

  // * (Enum list of reasons for insertion purpose.)
  public reasonsForTermination: string[] = [
    TaskStatus.STATUS_COMPLETED,
    TaskStatus.STATUS_CONDITION_CHANGED
  ];
  
  // * (Permit status to be updated into the fetched entry.)
  public newPermitStatus: string = "";

  // * (Closure/termination remarks fetched from server.)
  public taskStatusRemarksInput: string = "";

  // * (Safeguard input used to confirm closure/termination.)
  public typeToConfirmInput: string = "";

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(
    @Inject(MAT_DIALOG_DATA) public targetPtw: any,
    private dialogRefSelf: MatDialogRef<TerminateDialogComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private compShare: CompShareService,
    private mail: MailService
  ) {
    // * (Assign the cloterm remarks, if any, to be displayed on the dialog.)
    this.taskStatusRemarksInput = this.targetPtw[0].ptwStatus.remarks;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void { }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Determine the new permit status based on fetched reason of cloterm.)
  public determineNewPermitStatus(reason: string): void {
    switch (reason) {
      case TaskStatus.STATUS_COMPLETED:
        this.newPermitStatus = PermitStatus.STATUS_CLOSED;
        break;
      case TaskStatus.STATUS_CONDITION_CHANGED:
        this.newPermitStatus = PermitStatus.STATUS_TERMINATED;
        break;
    }
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Terminate the target permit.)
  public terminatePtw(reason: string, newPermitStatus: string): void {
    // * (Fields to be updated.)
    this.targetPtw[0].requestStatus = RequestStatus.REQUEST_NULLED;
    this.targetPtw[0].ptwStatus.checked = true;
    this.targetPtw[0].ptwStatus.taskStatus = reason;
    this.targetPtw[0].ptwStatus.permitStatus = newPermitStatus;
    this.targetPtw[0].ptwStatus.remarks = this.taskStatusRemarksInput;
    this.targetPtw[0].ptwStatus.supervisorName = this.targetPtw[0].applicantDets.name;
    this.targetPtw[0].ptwStatus.terminatedTimestamp = new Date().toISOString();

    this.ptwToCloseOrTerminate = this.targetPtw[0];
    this.putPtwData(this.ptwToCloseOrTerminate);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public putPtwData(toTerminate: IPermitToWork): void {
    // * (Update the entry.)
    this.db.update(
      toTerminate?.id,
      toTerminate?.ptwId,
      toTerminate?.ptwYear,
      toTerminate?.permitType,
      toTerminate?.locationOfWork?.main,
      toTerminate?.locationOfWork?.sub,
      toTerminate?.startWorkingDateTime,
      toTerminate?.endWorkingDateTime,
      //toTerminate?.taskDescription,
      toTerminate?.predefinedTask,
      toTerminate?.predefinedTaskOthers,
      toTerminate?.noOfWorkers,
      toTerminate?.noOfSupervisors,

      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toTerminate?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toTerminate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
      toTerminate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
      toTerminate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
      toTerminate?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

      toTerminate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
      toTerminate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
      toTerminate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
      toTerminate?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

      toTerminate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
      toTerminate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
      toTerminate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
      toTerminate?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
      toTerminate?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

      toTerminate?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
      toTerminate?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
      toTerminate?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

      toTerminate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
      toTerminate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
      toTerminate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
      toTerminate?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

      toTerminate?.confinedSpace?.sectionThree?.permitReview?.q01,
      toTerminate?.confinedSpace?.sectionThree?.permitReview?.q02,
      toTerminate?.confinedSpace?.sectionThree?.permitReview?.q03,
      toTerminate?.confinedSpace?.sectionThree?.permitReview?.q04,

      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
      toTerminate?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

      toTerminate?.hotWork?.sectionTwo?.assessment?.q01?.choice,
      toTerminate?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

      toTerminate?.hotWork?.sectionThree?.permitReview?.q01?.choice,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q02?.choice,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q03?.choice,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q04?.choice,
      toTerminate?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toTerminate?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toTerminate?.coldWork?.sectionTwo?.assessment?.q01?.choice,
      toTerminate?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

      toTerminate?.coldWork?.sectionThree?.permitReview?.q01?.choice,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q02?.choice,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q03?.choice,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q04?.choice,
      toTerminate?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toTerminate?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toTerminate?.electrical?.sectionTwo?.assessment?.q01?.choice,
      toTerminate?.electrical?.sectionTwo?.assessment?.q01?.remarks,

      toTerminate?.electrical?.sectionThree?.permitReview?.q01?.choice,
      toTerminate?.electrical?.sectionThree?.permitReview?.q01?.remarks,
      toTerminate?.electrical?.sectionThree?.permitReview?.q02?.choice,
      toTerminate?.electrical?.sectionThree?.permitReview?.q02?.remarks,
      toTerminate?.electrical?.sectionThree?.permitReview?.q03?.choice,
      toTerminate?.electrical?.sectionThree?.permitReview?.q03?.remarks,
      toTerminate?.electrical?.sectionThree?.permitReview?.q04?.choice,
      toTerminate?.electrical?.sectionThree?.permitReview?.q04?.remarks,

      toTerminate?.attendantDets?.[0].name,
      toTerminate?.attendantDets?.[0].nricOrFinNo,
      toTerminate?.attendantDets?.[0].role,
      toTerminate?.attendantDets?.[0].contactNo,

      toTerminate?.attendantDets?.[1].name,
      toTerminate?.attendantDets?.[1].nricOrFinNo,
      toTerminate?.attendantDets?.[1].role,
      toTerminate?.attendantDets?.[1].contactNo,

      toTerminate?.attendantDets?.[2].name,
      toTerminate?.attendantDets?.[2].nricOrFinNo,
      toTerminate?.attendantDets?.[2].role,
      toTerminate?.attendantDets?.[2].contactNo,

      toTerminate?.attendantDets?.[3].name,
      toTerminate?.attendantDets?.[3].nricOrFinNo,
      toTerminate?.attendantDets?.[3].role,
      toTerminate?.attendantDets?.[3].contactNo,

      toTerminate?.attendantDets?.[4].name,
      toTerminate?.attendantDets?.[4].nricOrFinNo,
      toTerminate?.attendantDets?.[4].role,
      toTerminate?.attendantDets?.[4].contactNo,

      toTerminate?.attendantDets?.[5].name,
      toTerminate?.attendantDets?.[5].nricOrFinNo,
      toTerminate?.attendantDets?.[5].role,
      toTerminate?.attendantDets?.[5].contactNo,

      toTerminate?.applicantDets?.name,
      toTerminate?.applicantDets?.nricOrFinNo,
      toTerminate?.applicantDets?.orgType,
      toTerminate?.applicantDets?.orgName,
      toTerminate?.applicantDets?.depName,
      toTerminate?.applicantDets?.contactNo,
      toTerminate?.applicantDets?.email,

      toTerminate?.ptwStatus?.permitStatus,
      toTerminate?.ptwStatus?.taskStatus,
      toTerminate?.ptwStatus?.remarks,
      toTerminate?.ptwStatus?.checked,
      toTerminate?.ptwStatus?.supervisorName,
      toTerminate?.ptwStatus?.wantToTerminate,
      toTerminate?.ptwStatus?.reqTermTimestamp,
      toTerminate?.ptwStatus?.terminatedTimestamp,
      toTerminate?.ptwStatus?.timestamp,

      toTerminate?.safetyAssessorEvaluation?.passed,
      toTerminate?.safetyAssessorEvaluation?.name,
      toTerminate?.safetyAssessorEvaluation?.timestamp,

      toTerminate?.authorisedManagerApproval?.passed,
      toTerminate?.authorisedManagerApproval?.name,
      toTerminate?.authorisedManagerApproval?.timestamp,

      toTerminate?.requestStatus,
      toTerminate?.wantToCancel,
      toTerminate?.reqCancTimestamp,
      toTerminate?.cancelledTimestamp,
      toTerminate?.timestamp
    );

    // * (Emit a click event signalling to do something to any comp subbed to this emitter.)
    this.compShare.sendClickEvent();
    this.dialogRefSelf.close();
    // * (Send email notif regarding the action.)
    this.db.fetchWith("id", toTerminate.id.toString()).subscribe((resp: IPermitToWork[]) => {
      this.mail.send(resp[0], resp[0].permitType);
    });
    this.openSnackBar("The permit has been " + toTerminate.ptwStatus.permitStatus.toLowerCase() + ". An email notification will be sent to you shortly.", "");

    // this.dialogRefSelf.close();
    // this.dialogRefSelf.afterClosed().subscribe(() => {
    //   // * (Send email notif regarding the action.)
    //   this.db.fetchWith("id", toTerminate.id.toString()).subscribe((resp: IPermitToWork[]) => {
    //     //this.mail.send(resp[0], resp[0].permitType);
    //   });
    //   this.openSnackBar("The permit has been " + toTerminate.ptwStatus.permitStatus.toLowerCase() + ". An email notification will be sent to you shortly.", "");
    //   // * (Emit a click event signalling to do something to any comp subbed to this emitter.)
    //   this.compShare.sendClickEvent();
    // });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Self-expiring toast message box after an action is performed.)
  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Router navigation without history tracebacks.)
  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// ==============================================================================================================================================================================