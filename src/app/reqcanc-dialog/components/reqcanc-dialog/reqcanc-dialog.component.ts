import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { CompShareService } from 'src/app/services/comp-share.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-reqcanc-dialog',
  templateUrl: './reqcanc-dialog.component.html',
  styleUrls: ['./reqcanc-dialog.component.scss']
})
export class ReqcancDialogComponent implements OnInit {
  public ptwToReqCanc: IPermitToWork = <IPermitToWork>{};

  constructor(
    @Inject(MAT_DIALOG_DATA) public fetched: any,
    private dialogRefSelf: MatDialogRef<ReqcancDialogComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private compShare: CompShareService,
    private mail: MailService
  ) { }

  public ngOnInit(): void { }

  public requestForCancellation(): void {
    this.fetched.ptw[0].wantToCancel = true;
    this.fetched.ptw[0].reqCancTimestamp = new Date().toISOString();

    this.ptwToReqCanc = this.fetched.ptw[0];

    this.putPtwData(this.ptwToReqCanc);
  }

  public putPtwData(toReqCanc: IPermitToWork): void {
    this.db.update(
      toReqCanc?.id,
      toReqCanc?.ptwId,
      toReqCanc?.ptwYear,
      toReqCanc?.permitType,
      toReqCanc?.locationOfWork?.main,
      toReqCanc?.locationOfWork?.sub,
      toReqCanc?.startWorkingDateTime,
      toReqCanc?.endWorkingDateTime,
      //toReqCanc?.taskDescription,
      toReqCanc?.predefinedTask,
      toReqCanc?.predefinedTaskOthers,
      toReqCanc?.noOfWorkers,
      toReqCanc?.noOfSupervisors,

      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toReqCanc?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toReqCanc?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
      toReqCanc?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
      toReqCanc?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
      toReqCanc?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

      toReqCanc?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
      toReqCanc?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
      toReqCanc?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
      toReqCanc?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

      toReqCanc?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
      toReqCanc?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
      toReqCanc?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
      toReqCanc?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
      toReqCanc?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

      toReqCanc?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
      toReqCanc?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
      toReqCanc?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

      toReqCanc?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
      toReqCanc?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
      toReqCanc?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
      toReqCanc?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

      toReqCanc?.confinedSpace?.sectionThree?.permitReview?.q01,
      toReqCanc?.confinedSpace?.sectionThree?.permitReview?.q02,
      toReqCanc?.confinedSpace?.sectionThree?.permitReview?.q03,
      toReqCanc?.confinedSpace?.sectionThree?.permitReview?.q04,

      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
      toReqCanc?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

      toReqCanc?.hotWork?.sectionTwo?.assessment?.q01?.choice,
      toReqCanc?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

      toReqCanc?.hotWork?.sectionThree?.permitReview?.q01?.choice,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q02?.choice,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q03?.choice,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q04?.choice,
      toReqCanc?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toReqCanc?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toReqCanc?.coldWork?.sectionTwo?.assessment?.q01?.choice,
      toReqCanc?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

      toReqCanc?.coldWork?.sectionThree?.permitReview?.q01?.choice,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q02?.choice,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q03?.choice,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q04?.choice,
      toReqCanc?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toReqCanc?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toReqCanc?.electrical?.sectionTwo?.assessment?.q01?.choice,
      toReqCanc?.electrical?.sectionTwo?.assessment?.q01?.remarks,

      toReqCanc?.electrical?.sectionThree?.permitReview?.q01?.choice,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q01?.remarks,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q02?.choice,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q02?.remarks,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q03?.choice,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q03?.remarks,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q04?.choice,
      toReqCanc?.electrical?.sectionThree?.permitReview?.q04?.remarks,

      toReqCanc?.attendantDets?.[0].name,
      toReqCanc?.attendantDets?.[0].nricOrFinNo,
      toReqCanc?.attendantDets?.[0].role,
      toReqCanc?.attendantDets?.[0].contactNo,

      toReqCanc?.attendantDets?.[1].name,
      toReqCanc?.attendantDets?.[1].nricOrFinNo,
      toReqCanc?.attendantDets?.[1].role,
      toReqCanc?.attendantDets?.[1].contactNo,

      toReqCanc?.attendantDets?.[2].name,
      toReqCanc?.attendantDets?.[2].nricOrFinNo,
      toReqCanc?.attendantDets?.[2].role,
      toReqCanc?.attendantDets?.[2].contactNo,

      toReqCanc?.attendantDets?.[3].name,
      toReqCanc?.attendantDets?.[3].nricOrFinNo,
      toReqCanc?.attendantDets?.[3].role,
      toReqCanc?.attendantDets?.[3].contactNo,

      toReqCanc?.attendantDets?.[4].name,
      toReqCanc?.attendantDets?.[4].nricOrFinNo,
      toReqCanc?.attendantDets?.[4].role,
      toReqCanc?.attendantDets?.[4].contactNo,

      toReqCanc?.attendantDets?.[5].name,
      toReqCanc?.attendantDets?.[5].nricOrFinNo,
      toReqCanc?.attendantDets?.[5].role,
      toReqCanc?.attendantDets?.[5].contactNo,

      toReqCanc?.applicantDets?.name,
      toReqCanc?.applicantDets?.nricOrFinNo,
      toReqCanc?.applicantDets?.orgType,
      toReqCanc?.applicantDets?.orgName,
      toReqCanc?.applicantDets?.depName,
      toReqCanc?.applicantDets?.contactNo,
      toReqCanc?.applicantDets?.email,

      toReqCanc?.ptwStatus?.permitStatus,
      toReqCanc?.ptwStatus?.taskStatus,
      toReqCanc?.ptwStatus?.remarks,
      toReqCanc?.ptwStatus?.checked,
      toReqCanc?.ptwStatus?.supervisorName,
      toReqCanc?.ptwStatus?.wantToTerminate,
      toReqCanc?.ptwStatus?.reqTermTimestamp,
      toReqCanc?.ptwStatus?.terminatedTimestamp,
      toReqCanc?.ptwStatus?.timestamp,

      toReqCanc?.safetyAssessorEvaluation?.passed,
      toReqCanc?.safetyAssessorEvaluation?.name,
      toReqCanc?.safetyAssessorEvaluation?.timestamp,

      toReqCanc?.authorisedManagerApproval?.passed,
      toReqCanc?.authorisedManagerApproval?.name,
      toReqCanc?.authorisedManagerApproval?.timestamp,

      toReqCanc?.requestStatus,
      toReqCanc?.wantToCancel,
      toReqCanc?.reqCancTimestamp,
      toReqCanc?.cancelledTimestamp,
      toReqCanc?.timestamp
    );

    // * (Emit a click event signalling to do something to any comp subbed to this emitter.)
    this.compShare.sendClickEvent();
    this.dialogRefSelf.close();
    // * (Send email notif regarding the action.)
    this.db.fetchWith("id", toReqCanc.id.toString()).subscribe((resp: IPermitToWork[]) => {
      this.mail.send(resp[0], resp[0].permitType);
    });
    this.openSnackBar("A cancellation request has been sent. An email notification will be sent to you shortly.", "");

    // this.dialogRefSelf.close();
    // this.dialogRefSelf.afterClosed().subscribe(() => {
    //   // * (Send email notif regarding the action.)
    //   this.db.fetchWith("id", toReqCanc.id.toString()).subscribe((resp: IPermitToWork[]) => {
    //     //this.mail.send(resp[0], resp[0].permitType);
    //   });
    //   this.openSnackBar("A cancellation request has been sent. An email notification will be sent to you shortly.", "");
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