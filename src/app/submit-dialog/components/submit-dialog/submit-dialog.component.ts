import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent implements OnInit {
  private ptwReqToSubmit: IPermitToWork = <IPermitToWork>{};

  constructor(
    private dialogRefSelf: MatDialogRef<SubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedPartiallyCompletedPTWForm: IPermitToWork,
    private db: DbService,
    private msg: MessageService,
    private router: Router
  ) { }

  public ngOnInit(): void { }

  public submitApplication(): void {
    this.injectedPartiallyCompletedPTWForm!.timestamp = new Date().toISOString();

    this.ptwReqToSubmit = this.injectedPartiallyCompletedPTWForm;
    this.postPtwReq(this.ptwReqToSubmit);
  }

  public postPtwReq(toSubmit: IPermitToWork): void {
    this.db.post(toSubmit)
      .subscribe((data : IPermitToWork) => {

        var generatedPtwId: string = "PTW-" + data?.id?.toString().padStart(3, "0");
        this.db.update(
          data?.id,
          generatedPtwId,
          data?.permitType,
          data?.locationOfWork?.main,
          data?.locationOfWork?.sub,
          data?.startWorkingDateTime,
          data?.endWorkingDateTime,
          data?.taskDescription,
          data?.noOfWorkers,
          data?.noOfSupervisors,

          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
          data?.workAtHeight?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

          data?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.choice,
          data?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q01?.remarks,
          data?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.choice,
          data?.workAtHeight?.sectionTwo?.assessmentOfControlMeasures?.q02?.remarks,

          data?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.choice,
          data?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q01?.remarks,
          data?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.choice,
          data?.workAtHeight?.sectionTwo?.siteSurveyFromSupervisor?.q02?.remarks,

          data?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.choice,
          data?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q01?.remarks,
          data?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.choice,
          data?.workAtHeight?.sectionTwo?.multiLocOrExtentedDuration?.q02?.remarks,

          data?.workAtHeight?.sectionThree?.permitReview?.q01?.choice,
          data?.workAtHeight?.sectionThree?.permitReview?.q01?.remarks,
          data?.workAtHeight?.sectionThree?.permitReview?.q02?.choice,
          data?.workAtHeight?.sectionThree?.permitReview?.q02?.remarks,
          data?.workAtHeight?.sectionThree?.permitReview?.q03?.choice,
          data?.workAtHeight?.sectionThree?.permitReview?.q03?.remarks,
          data?.workAtHeight?.sectionThree?.permitReview?.q04?.choice,
          data?.workAtHeight?.sectionThree?.permitReview?.q04?.remarks,

          data?.confinedSpace?.sectionOne?.potentialHazards?.atmo,
          data?.confinedSpace?.sectionOne?.potentialHazards?.nonAtmo,

          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q01,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q02,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q03,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q04,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q05,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q06,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q07,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.preEntryReqs?.q08,

          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q01,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q02,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q03,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q04,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q05,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q06,
          data?.confinedSpace?.sectionOne?.controlMeasuresImplemented?.ppe?.q07?.specify,

          data?.confinedSpace?.sectionTwo?.gasMonitoringRes?.oxygenLevel,
          data?.confinedSpace?.sectionTwo?.gasMonitoringRes?.flammableGasLevel,
          data?.confinedSpace?.sectionTwo?.gasMonitoringRes?.toxicGasLevel,
          data?.confinedSpace?.sectionTwo?.gasMonitoringRes?.fitForEntry,

          data?.confinedSpace?.sectionThree?.permitReview?.q01,
          data?.confinedSpace?.sectionThree?.permitReview?.q02,
          data?.confinedSpace?.sectionThree?.permitReview?.q03,
          data?.confinedSpace?.sectionThree?.permitReview?.q04,

          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q10?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.choice,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q11?.remarks,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q12?.specify,
          data?.hotWork?.sectionOne?.controlMeasuresImplemented?.q13?.specify,

          data?.hotWork?.sectionTwo?.assessment?.q01?.choice,
          data?.hotWork?.sectionTwo?.assessment?.q01?.remarks,

          data?.hotWork?.sectionThree?.permitReview?.q01?.choice,
          data?.hotWork?.sectionThree?.permitReview?.q01?.remarks,
          data?.hotWork?.sectionThree?.permitReview?.q02?.choice,
          data?.hotWork?.sectionThree?.permitReview?.q02?.remarks,
          data?.hotWork?.sectionThree?.permitReview?.q03?.choice,
          data?.hotWork?.sectionThree?.permitReview?.q03?.remarks,
          data?.hotWork?.sectionThree?.permitReview?.q04?.choice,
          data?.hotWork?.sectionThree?.permitReview?.q04?.remarks,

          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
          data?.coldWork?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

          data?.coldWork?.sectionTwo?.assessment?.q01?.choice,
          data?.coldWork?.sectionTwo?.assessment?.q01?.remarks,

          data?.coldWork?.sectionThree?.permitReview?.q01?.choice,
          data?.coldWork?.sectionThree?.permitReview?.q01?.remarks,
          data?.coldWork?.sectionThree?.permitReview?.q02?.choice,
          data?.coldWork?.sectionThree?.permitReview?.q02?.remarks,
          data?.coldWork?.sectionThree?.permitReview?.q03?.choice,
          data?.coldWork?.sectionThree?.permitReview?.q03?.remarks,
          data?.coldWork?.sectionThree?.permitReview?.q04?.choice,
          data?.coldWork?.sectionThree?.permitReview?.q04?.remarks,

          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q01?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q02?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q03?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q04?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q05?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q06?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q07?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q08?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.choice,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q09?.remarks,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q10?.specify,
          data?.electrical?.sectionOne?.controlMeasuresImplemented?.q11?.specify,

          data?.electrical?.sectionTwo?.assessment?.q01?.choice,
          data?.electrical?.sectionTwo?.assessment?.q01?.remarks,

          data?.electrical?.sectionThree?.permitReview?.q01?.choice,
          data?.electrical?.sectionThree?.permitReview?.q01?.remarks,
          data?.electrical?.sectionThree?.permitReview?.q02?.choice,
          data?.electrical?.sectionThree?.permitReview?.q02?.remarks,
          data?.electrical?.sectionThree?.permitReview?.q03?.choice,
          data?.electrical?.sectionThree?.permitReview?.q03?.remarks,
          data?.electrical?.sectionThree?.permitReview?.q04?.choice,
          data?.electrical?.sectionThree?.permitReview?.q04?.remarks,

          data?.attendantDets?.[0].name,
          data?.attendantDets?.[0].nricOrFinNo,
          data?.attendantDets?.[0].contactNo,

          data?.attendantDets?.[1].name,
          data?.attendantDets?.[1].nricOrFinNo,
          data?.attendantDets?.[1].contactNo,

          data?.attendantDets?.[2].name,
          data?.attendantDets?.[2].nricOrFinNo,
          data?.attendantDets?.[2].contactNo,

          data?.attendantDets?.[3].name,
          data?.attendantDets?.[3].nricOrFinNo,
          data?.attendantDets?.[3].contactNo,

          data?.attendantDets?.[4].name,
          data?.attendantDets?.[4].nricOrFinNo,
          data?.attendantDets?.[4].contactNo,

          data?.applicantDets?.name,
          data?.applicantDets?.nricOrFinNo,
          data?.applicantDets?.orgType,
          data?.applicantDets?.orgName,
          data?.applicantDets?.depName,
          data?.applicantDets?.contactNo,
          data?.applicantDets?.email,

          data?.ptwStatus?.permitStatus,
          data?.ptwStatus?.remarks,
          data?.ptwStatus?.checked,
          data?.ptwStatus?.supervisorName,
          data?.ptwStatus?.timestamp,

          data?.safetyAssessorEvaluation?.passed,
          data?.safetyAssessorEvaluation?.name,
          data?.safetyAssessorEvaluation?.timestamp,

          data?.authorisedManagerApproval?.passed,
          data?.authorisedManagerApproval?.name,
          data?.authorisedManagerApproval?.timestamp,

          data?.requestStatus,
          data?.statusRemarks,
          data?.timestamp
        );

        this.dialogRefSelf.close();
        this.dialogRefSelf.afterClosed().subscribe(() => {
          this.navigateTo("");
          this.openSnackBar("A new PTW request has been made! An email statement will be sent to you shortly.", "");
        });
    });
  }

  public openSnackBar(msg: string, action: string): void {
    this.msg.openSnackBar(msg, action, 3000);
  }

  public navigateTo(url: string): void {
    this.router.navigate(["/" + url], { replaceUrl: true });
  }
}