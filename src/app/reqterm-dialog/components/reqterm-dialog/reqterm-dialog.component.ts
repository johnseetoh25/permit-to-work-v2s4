import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { TaskStatus } from 'src/app/constants/TaskStatus';
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { CompShareService } from 'src/app/services/comp-share.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-reqterm-dialog',
  templateUrl: './reqterm-dialog.component.html',
  styleUrls: ['./reqterm-dialog.component.scss']
})
export class ReqtermDialogComponent implements OnInit {
  public ptwToReqTerm: IPermitToWork = <IPermitToWork>{};

  public reasonsForTermination: string[] = [
    TaskStatus.STATUS_COMPLETED,
    TaskStatus.STATUS_CONDITION_CHANGED
  ];

  public selectedReason: string = "";
  public newPermitStatus: string = "";
  public taskStatusRemarksInput: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetched: any,
    private dialogRefSelf: MatDialogRef<ReqtermDialogComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private compShare: CompShareService,
    private mail: MailService
  ) { }

  public ngOnInit(): void { }

  public requestForTermination(): void {
    if (this.selectedReason == TaskStatus.STATUS_COMPLETED) {
      this.fetched.ptw[0].ptwStatus.taskStatus = TaskStatus.STATUS_COMPLETED;
    }
    if (this.selectedReason == TaskStatus.STATUS_CONDITION_CHANGED) {
      this.fetched.ptw[0].ptwStatus.taskStatus = TaskStatus.STATUS_CONDITION_CHANGED;
    }

    this.fetched.ptw[0].ptwStatus.wantToTerminate = true;
    
    if (this.taskStatusRemarksInput == "") {
      this.taskStatusRemarksInput = DefaultValues.VALUE_NONE;
    } else {
      this.fetched.ptw[0].ptwStatus.remarks = this.taskStatusRemarksInput;
    }

    this.fetched.ptw[0].ptwStatus.reqTermTimestamp = new Date().toISOString();

    this.ptwToReqTerm = this.fetched.ptw[0];

    this.putPtwData(this.ptwToReqTerm);
  }

  public putPtwData(toReqTerm: IPermitToWork): void {
    this.db.update(
      toReqTerm?.id,
      toReqTerm?.ptwId,
      toReqTerm?.ptwYear,
      toReqTerm?.permitType,
      toReqTerm?.locationOfWork?.main,
      toReqTerm?.locationOfWork?.sub,
      toReqTerm?.startWorkingDateTime,
      toReqTerm?.endWorkingDateTime,
      //toReqTerm?.taskDescription,
      toReqTerm?.predefinedTask,
      toReqTerm?.predefinedTaskOthers,
      toReqTerm?.noOfWorkers,
      toReqTerm?.noOfSupervisors,

      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toReqTerm?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toReqTerm?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
      toReqTerm?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
      toReqTerm?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
      toReqTerm?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

      toReqTerm?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
      toReqTerm?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
      toReqTerm?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
      toReqTerm?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

      toReqTerm?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
      toReqTerm?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
      toReqTerm?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
      toReqTerm?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
      toReqTerm?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

      toReqTerm?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
      toReqTerm?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
      toReqTerm?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

      toReqTerm?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
      toReqTerm?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
      toReqTerm?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
      toReqTerm?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

      toReqTerm?.confinedSpace?.sectionThree?.permitReview?.q01,
      toReqTerm?.confinedSpace?.sectionThree?.permitReview?.q02,
      toReqTerm?.confinedSpace?.sectionThree?.permitReview?.q03,
      toReqTerm?.confinedSpace?.sectionThree?.permitReview?.q04,

      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
      toReqTerm?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

      toReqTerm?.hotWork?.sectionTwo?.assessment?.q01?.choice,
      toReqTerm?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

      toReqTerm?.hotWork?.sectionThree?.permitReview?.q01?.choice,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q02?.choice,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q03?.choice,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q04?.choice,
      toReqTerm?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toReqTerm?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toReqTerm?.coldWork?.sectionTwo?.assessment?.q01?.choice,
      toReqTerm?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

      toReqTerm?.coldWork?.sectionThree?.permitReview?.q01?.choice,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q02?.choice,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q03?.choice,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q04?.choice,
      toReqTerm?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toReqTerm?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toReqTerm?.electrical?.sectionTwo?.assessment?.q01?.choice,
      toReqTerm?.electrical?.sectionTwo?.assessment?.q01?.remarks,

      toReqTerm?.electrical?.sectionThree?.permitReview?.q01?.choice,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q01?.remarks,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q02?.choice,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q02?.remarks,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q03?.choice,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q03?.remarks,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q04?.choice,
      toReqTerm?.electrical?.sectionThree?.permitReview?.q04?.remarks,

      toReqTerm?.attendantDets?.[0].name,
      toReqTerm?.attendantDets?.[0].nricOrFinNo,
      toReqTerm?.attendantDets?.[0].role,
      toReqTerm?.attendantDets?.[0].contactNo,

      toReqTerm?.attendantDets?.[1].name,
      toReqTerm?.attendantDets?.[1].nricOrFinNo,
      toReqTerm?.attendantDets?.[1].role,
      toReqTerm?.attendantDets?.[1].contactNo,

      toReqTerm?.attendantDets?.[2].name,
      toReqTerm?.attendantDets?.[2].nricOrFinNo,
      toReqTerm?.attendantDets?.[2].role,
      toReqTerm?.attendantDets?.[2].contactNo,

      toReqTerm?.attendantDets?.[3].name,
      toReqTerm?.attendantDets?.[3].nricOrFinNo,
      toReqTerm?.attendantDets?.[3].role,
      toReqTerm?.attendantDets?.[3].contactNo,

      toReqTerm?.attendantDets?.[4].name,
      toReqTerm?.attendantDets?.[4].nricOrFinNo,
      toReqTerm?.attendantDets?.[4].role,
      toReqTerm?.attendantDets?.[4].contactNo,

      toReqTerm?.attendantDets?.[5].name,
      toReqTerm?.attendantDets?.[5].nricOrFinNo,
      toReqTerm?.attendantDets?.[5].role,
      toReqTerm?.attendantDets?.[5].contactNo,

      toReqTerm?.applicantDets?.name,
      toReqTerm?.applicantDets?.nricOrFinNo,
      toReqTerm?.applicantDets?.orgType,
      toReqTerm?.applicantDets?.orgName,
      toReqTerm?.applicantDets?.depName,
      toReqTerm?.applicantDets?.contactNo,
      toReqTerm?.applicantDets?.email,

      toReqTerm?.ptwStatus?.permitStatus,
      toReqTerm?.ptwStatus?.taskStatus,
      toReqTerm?.ptwStatus?.remarks,
      toReqTerm?.ptwStatus?.checked,
      toReqTerm?.ptwStatus?.supervisorName,
      toReqTerm?.ptwStatus?.wantToTerminate,
      toReqTerm?.ptwStatus?.reqTermTimestamp,
      toReqTerm?.ptwStatus?.terminatedTimestamp,
      toReqTerm?.ptwStatus?.timestamp,

      toReqTerm?.safetyAssessorEvaluation?.passed,
      toReqTerm?.safetyAssessorEvaluation?.name,
      toReqTerm?.safetyAssessorEvaluation?.timestamp,

      toReqTerm?.authorisedManagerApproval?.passed,
      toReqTerm?.authorisedManagerApproval?.name,
      toReqTerm?.authorisedManagerApproval?.timestamp,

      toReqTerm?.requestStatus,
      toReqTerm?.wantToCancel,
      toReqTerm?.reqCancTimestamp,
      toReqTerm?.cancelledTimestamp,
      toReqTerm?.timestamp
    );
    
    // * (Emit a click event signalling to do something to any comp subbed to this emitter.)
    this.compShare.sendClickEvent();
    this.dialogRefSelf.close();
    // * (Send email notif regarding the action.)
    this.db.fetchWith("id", toReqTerm.id.toString()).subscribe((resp: IPermitToWork[]) => {
      this.mail.send(resp[0], resp[0].permitType);
    });
    this.openSnackBar("A closure/termination request has been sent. An email notification will be sent to you shortly.", "");

    // this.dialogRefSelf.close();
    // this.dialogRefSelf.afterClosed().subscribe(() => {
    //   // * (Send email notif regarding the action.)
    //   this.db.fetchWith("id", toReqTerm.id.toString()).subscribe((resp: IPermitToWork[]) => {
    //     //this.mail.send(resp[0], resp[0].permitType);
    //   });
    //   this.openSnackBar("A closure/termination request has been sent. An email notification will be sent to you shortly.", "");
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
