// ==============================================================================================================================================================================

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { MessageService } from 'src/app/services/message.service';
import { MailService } from 'src/app/services/mail.service';

// ==============================================================================================================================================================================

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})

// ==============================================================================================================================================================================

export class SubmitDialogComponent implements OnInit {
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Empty permit request object to submit to the server.)
  private ptwReqToSubmit: IPermitToWork = <IPermitToWork>{};

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(
    private dialogRefSelf: MatDialogRef<SubmitDialogComponent>,
    // * (Passing the dialog data from the ptw-request page, i.e.: reqForm.)
    @Inject(MAT_DIALOG_DATA) public reqFormData: IPermitToWork,
    private db: DbService,
    private msg: MessageService,
    private router: Router,
    private mail: MailService
  ) { }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  public ngOnInit(): void { }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Submit the application combining the reqForm from ptw-request + data updates here, then submit
  // to the server.)
  public submitApplication(): void {
    // * (Insert and replace a timestamp string into the injected reqFormData.)
    this.reqFormData.timestamp = new Date().toISOString();
    // * (Insert and replace the year in which the request was made.)
    this.reqFormData.ptwYear = this.reqFormData.timestamp.substring(0, 4);

    this.ptwReqToSubmit = this.reqFormData;
    this.postPtwReq(this.ptwReqToSubmit);
  }

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // * (Update the request-to-post to the server.)
  public postPtwReq(toSubmit: IPermitToWork): void {
    this.db.post(toSubmit)
      .subscribe((data: IPermitToWork) => {
        // * (After adding new entry, refetch previous entry from newly added entry. If prev entry does
        // not exist, refetch newly added entry.)
        this.db.fetchWith("id", (data.id - 1).toString()).subscribe((result: IPermitToWork[]) => {
          // * (Previous entry's year of req.)
          var tempPreviousPtwYear: number = 0;
          // * (Current entry's year of req.)
          var tempCurrentPtwYear: number = 0;
          // * (Current entry's req id.)
          var tempPtwNo: number = 0;
          // * (Final permit ID to be updated back the said entry, i.e.: PTW-YY1234)
          var generatedPtwId: string = "";

          // * (If fetch result returns null or undefined, use only the current entry's year of req. to
          // format the permit ID.)
          if (result[0] == null || result[0] == undefined) {
            tempCurrentPtwYear = Number(data.ptwYear);
            tempPtwNo = data.id;
            generatedPtwId = "PTW-" + tempCurrentPtwYear.toString().substring(2, 4) + tempPtwNo.toString().padStart(4, "0");
          // * (Else, extract the previous and current year of req. to format the permit ID.)
          } else {
            tempPreviousPtwYear = Number(result[0].ptwYear);
            tempCurrentPtwYear = Number(data.ptwYear);
            tempPtwNo = data.id;

            // * (If previous year of req. is smaller than current one, reset the req. no back to 1 and
            // and start incrementing from there on.)
            if (tempPreviousPtwYear < tempCurrentPtwYear) {
              console.log("The year has progressed by 1!", result[0].ptwId, "Prev ptw year: " + tempPreviousPtwYear, "Current ptw year: " + tempCurrentPtwYear);
              console.log("First case:" + tempPtwNo);

              // * (Resetting formula: b = a - (a - 1), where b is the final req. id.)
              generatedPtwId = "PTW-" + tempCurrentPtwYear.toString().substring(2, 4) + (tempPtwNo - (tempPtwNo - 1)).toString().padStart(4, "0");
            // * (Else, let req. id as it is.)
            } else {
              console.log("The year remains the same.", result[0].ptwId, "Prev ptw year: " + tempPreviousPtwYear, "Current ptw year: " + tempCurrentPtwYear);
              console.log("Second case:" + tempPtwNo);
              generatedPtwId = "PTW-" + tempCurrentPtwYear.toString().substring(2, 4) + tempPtwNo.toString().padStart(4, "0");
            }
          }

          // * (Update the entry.)
          this.db.update(
            tempPtwNo,
            generatedPtwId,
            tempCurrentPtwYear.toString(),
            data?.permitType,
            data?.locationOfWork?.main,
            data?.locationOfWork?.sub,
            data?.startWorkingDateTime,
            data?.endWorkingDateTime,
            //data?.taskDescription,
            data?.predefinedTask,
            data?.predefinedTaskOthers,
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
            data?.attendantDets?.[0].role,
            data?.attendantDets?.[0].contactNo,

            data?.attendantDets?.[1].name,
            data?.attendantDets?.[1].nricOrFinNo,
            data?.attendantDets?.[1].role,
            data?.attendantDets?.[1].contactNo,

            data?.attendantDets?.[2].name,
            data?.attendantDets?.[2].nricOrFinNo,
            data?.attendantDets?.[2].role,
            data?.attendantDets?.[2].contactNo,

            data?.attendantDets?.[3].name,
            data?.attendantDets?.[3].nricOrFinNo,
            data?.attendantDets?.[3].role,
            data?.attendantDets?.[3].contactNo,

            data?.attendantDets?.[4].name,
            data?.attendantDets?.[4].nricOrFinNo,
            data?.attendantDets?.[4].role,
            data?.attendantDets?.[4].contactNo,

            data?.attendantDets?.[5].name,
            data?.attendantDets?.[5].nricOrFinNo,
            data?.attendantDets?.[5].role,
            data?.attendantDets?.[5].contactNo,

            data?.applicantDets?.name,
            data?.applicantDets?.nricOrFinNo,
            data?.applicantDets?.orgType,
            data?.applicantDets?.orgName,
            data?.applicantDets?.depName,
            data?.applicantDets?.contactNo,
            data?.applicantDets?.email,

            data?.ptwStatus?.permitStatus,
            data?.ptwStatus?.taskStatus,
            data?.ptwStatus?.remarks,
            data?.ptwStatus?.checked,
            data?.ptwStatus?.supervisorName,
            data?.ptwStatus?.wantToTerminate,
            data?.ptwStatus?.reqTermTimestamp,
            data?.ptwStatus?.terminatedTimestamp,
            data?.ptwStatus?.timestamp,

            data?.safetyAssessorEvaluation?.passed,
            data?.safetyAssessorEvaluation?.name,
            data?.safetyAssessorEvaluation?.timestamp,

            data?.authorisedManagerApproval?.passed,
            data?.authorisedManagerApproval?.name,
            data?.authorisedManagerApproval?.timestamp,

            data?.requestStatus,
            data?.wantToCancel,
            data?.reqCancTimestamp,
            data?.cancelledTimestamp,
            data?.timestamp
          );

          this.dialogRefSelf.close();
          this.dialogRefSelf.afterClosed().subscribe(() => {
            this.navigateTo("");
            // * (Send email notif regarding the action.)
            this.db.fetchWith("id", data.id.toString()).subscribe((result: IPermitToWork[]) => {
              //this.mail.send(result[0], result[0].permitType);
            });
            this.openSnackBar("A new PTW request has been made! An email notification will be sent to you shortly.", "");
          });
        },
        (err: any) => {
          console.error("Error: ", err);
        });
    });
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