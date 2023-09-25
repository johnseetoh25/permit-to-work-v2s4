import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { CompShareService } from 'src/app/services/comp-share.service';
import { RequestStatus } from 'src/app/constants/RequestStatus';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent implements OnInit {
  public ptwToCancel: IPermitToWork = <IPermitToWork>{};

  constructor(
    @Inject(MAT_DIALOG_DATA) public targetPtw: any,
    private dialog: MatDialog,
    private dialogRefSelf: MatDialogRef<CancelDialogComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private compShare: CompShareService,
    private mail: MailService
  ) { }

  public ngOnInit(): void { }

  public cancelPtw(): void {
    this.targetPtw[0].requestStatus = RequestStatus.REQUEST_CANCELLED;
    this.targetPtw[0].ptwStatus.permitStatus = PermitStatus.STATUS_INVALID;
    this.targetPtw[0].cancelledTimestamp = new Date().toISOString();

    this.ptwToCancel = this.targetPtw[0];

    this.putPtwData(this.ptwToCancel);
  }

  public putPtwData(toCancel: IPermitToWork): void {
    this.db.update(
      toCancel?.id,
      toCancel?.ptwId,
      toCancel?.ptwYear,
      toCancel?.permitType,
      toCancel?.locationOfWork?.main,
      toCancel?.locationOfWork?.sub,
      toCancel?.startWorkingDateTime,
      toCancel?.endWorkingDateTime,
      //toCancel?.taskDescription,
      toCancel?.predefinedTask,
      toCancel?.predefinedTaskOthers,
      toCancel?.noOfWorkers,
      toCancel?.noOfSupervisors,

      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toCancel?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toCancel?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
      toCancel?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
      toCancel?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
      toCancel?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

      toCancel?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
      toCancel?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
      toCancel?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
      toCancel?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

      toCancel?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
      toCancel?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
      toCancel?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
      toCancel?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

      toCancel?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
      toCancel?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

      toCancel?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
      toCancel?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
      toCancel?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

      toCancel?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
      toCancel?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
      toCancel?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
      toCancel?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

      toCancel?.confinedSpace?.sectionThree?.permitReview?.q01,
      toCancel?.confinedSpace?.sectionThree?.permitReview?.q02,
      toCancel?.confinedSpace?.sectionThree?.permitReview?.q03,
      toCancel?.confinedSpace?.sectionThree?.permitReview?.q04,

      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
      toCancel?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

      toCancel?.hotWork?.sectionTwo?.assessment?.q01?.choice,
      toCancel?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

      toCancel?.hotWork?.sectionThree?.permitReview?.q01?.choice,
      toCancel?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
      toCancel?.hotWork?.sectionThree?.permitReview?.q02?.choice,
      toCancel?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
      toCancel?.hotWork?.sectionThree?.permitReview?.q03?.choice,
      toCancel?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
      toCancel?.hotWork?.sectionThree?.permitReview?.q04?.choice,
      toCancel?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toCancel?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toCancel?.coldWork?.sectionTwo?.assessment?.q01?.choice,
      toCancel?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

      toCancel?.coldWork?.sectionThree?.permitReview?.q01?.choice,
      toCancel?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
      toCancel?.coldWork?.sectionThree?.permitReview?.q02?.choice,
      toCancel?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
      toCancel?.coldWork?.sectionThree?.permitReview?.q03?.choice,
      toCancel?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
      toCancel?.coldWork?.sectionThree?.permitReview?.q04?.choice,
      toCancel?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
      toCancel?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

      toCancel?.electrical?.sectionTwo?.assessment?.q01?.choice,
      toCancel?.electrical?.sectionTwo?.assessment?.q01?.remarks,

      toCancel?.electrical?.sectionThree?.permitReview?.q01?.choice,
      toCancel?.electrical?.sectionThree?.permitReview?.q01?.remarks,
      toCancel?.electrical?.sectionThree?.permitReview?.q02?.choice,
      toCancel?.electrical?.sectionThree?.permitReview?.q02?.remarks,
      toCancel?.electrical?.sectionThree?.permitReview?.q03?.choice,
      toCancel?.electrical?.sectionThree?.permitReview?.q03?.remarks,
      toCancel?.electrical?.sectionThree?.permitReview?.q04?.choice,
      toCancel?.electrical?.sectionThree?.permitReview?.q04?.remarks,

      toCancel?.attendantDets?.[0].name,
      toCancel?.attendantDets?.[0].nricOrFinNo,
      toCancel?.attendantDets?.[0].role,
      toCancel?.attendantDets?.[0].contactNo,

      toCancel?.attendantDets?.[1].name,
      toCancel?.attendantDets?.[1].nricOrFinNo,
      toCancel?.attendantDets?.[1].role,
      toCancel?.attendantDets?.[1].contactNo,

      toCancel?.attendantDets?.[2].name,
      toCancel?.attendantDets?.[2].nricOrFinNo,
      toCancel?.attendantDets?.[2].role,
      toCancel?.attendantDets?.[2].contactNo,

      toCancel?.attendantDets?.[3].name,
      toCancel?.attendantDets?.[3].nricOrFinNo,
      toCancel?.attendantDets?.[3].role,
      toCancel?.attendantDets?.[3].contactNo,

      toCancel?.attendantDets?.[4].name,
      toCancel?.attendantDets?.[4].nricOrFinNo,
      toCancel?.attendantDets?.[4].role,
      toCancel?.attendantDets?.[4].contactNo,

      toCancel?.attendantDets?.[5].name,
      toCancel?.attendantDets?.[5].nricOrFinNo,
      toCancel?.attendantDets?.[5].role,
      toCancel?.attendantDets?.[5].contactNo,

      toCancel?.applicantDets?.name,
      toCancel?.applicantDets?.nricOrFinNo,
      toCancel?.applicantDets?.orgType,
      toCancel?.applicantDets?.orgName,
      toCancel?.applicantDets?.depName,
      toCancel?.applicantDets?.contactNo,
      toCancel?.applicantDets?.email,

      toCancel?.ptwStatus?.permitStatus,
      toCancel?.ptwStatus?.taskStatus,
      toCancel?.ptwStatus?.remarks,
      toCancel?.ptwStatus?.checked,
      toCancel?.ptwStatus?.supervisorName,
      toCancel?.ptwStatus?.wantToTerminate,
      toCancel?.ptwStatus?.reqTermTimestamp,
      toCancel?.ptwStatus?.terminatedTimestamp,
      toCancel?.ptwStatus?.timestamp,

      toCancel?.safetyAssessorEvaluation?.passed,
      toCancel?.safetyAssessorEvaluation?.name,
      toCancel?.safetyAssessorEvaluation?.timestamp,

      toCancel?.authorisedManagerApproval?.passed,
      toCancel?.authorisedManagerApproval?.name,
      toCancel?.authorisedManagerApproval?.timestamp,

      toCancel?.requestStatus,
      toCancel?.wantToCancel,
      toCancel?.reqCancTimestamp,
      toCancel?.cancelledTimestamp,
      toCancel?.timestamp
    );

    // * (Emit a click event signalling to do something to any comp subbed to this emitter.)
    this.compShare.sendClickEvent();
    this.dialogRefSelf.close();
    // * (Send email notif regarding the action.)
    this.db.fetchWith("id", toCancel.id.toString()).subscribe((resp: IPermitToWork[]) => {
      this.mail.send(resp[0], resp[0].permitType);
    });
    this.openSnackBar("The request has been " + toCancel.requestStatus.toLowerCase() + ". An email notification will be sent to you shortly.", "");
    

    // this.dialogRefSelf.close();
    // this.dialogRefSelf.afterClosed().subscribe(() => {
    //   // * (Send email notif regarding the action.)
    //   this.db.fetchWith("id", toCancel.id.toString()).subscribe((resp: IPermitToWork[]) => {
    //     //this.mail.send(resp[0], resp[0].permitType);
    //   });
    //   this.openSnackBar("The request has been " + toCancel.requestStatus.toLowerCase() + ". An email notification will be sent to you shortly.", "");
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