import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { PermitTypes } from '../constants/PermitTypes';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  // public send(data: IPermitToWork, type: string): void {
  //   var templateId = "";
  //   var templateParams = {};

  //   switch (type) {
  //     case PermitTypes.WORK_AT_HEIGHT:
  //       templateId = "template_bf8cssj";

  //       templateParams = {
  //         to_name: data.applicantDets.name,
  //         from_name: "Temasek Polytechnic PTW E-Mng System",
    
  //         ptw_id: data.ptwId,
  //         loc_main: data.locationOfWork.main,
  //         loc_sub: data.locationOfWork.sub,
  //         permit_type: data.permitType,
  //         start_datetime: new Date(data.startWorkingDateTime).toLocaleString(),
  //         end_datetime: new Date(data.endWorkingDateTime).toLocaleString(),
  //         task_desc: data.taskDescription,
  //         no_of_workers: data.noOfWorkers,
  //         no_of_spvs: data.noOfSupervisors,
  //         apl_nric_fin_no: data.applicantDets.nricOrFinNo,
  //         apl_org_name: data.applicantDets.orgName,
  //         apl_org_type: data.applicantDets.orgType,
  //         apl_dep_name: data.applicantDets.depName,
  //         apl_contact_no: data.applicantDets.contactNo,

  //         wah_s1_cmi_q01_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q01.choice,
  //         wah_s1_cmi_q01_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q01.remarks,

  //         wah_s1_cmi_q02_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q02.choice,
  //         wah_s1_cmi_q02_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q02.remarks,

  //         wah_s1_cmi_q03_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q03.choice,
  //         wah_s1_cmi_q03_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q03.remarks,

  //         wah_s1_cmi_q04_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q04.choice,
  //         wah_s1_cmi_q04_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q04.remarks,

  //         wah_s1_cmi_q05_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q05.choice,
  //         wah_s1_cmi_q05_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q05.remarks,

  //         wah_s1_cmi_q06_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q06.choice,
  //         wah_s1_cmi_q06_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q06.remarks,

  //         wah_s1_cmi_q07_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q07.choice,
  //         wah_s1_cmi_q07_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q07.remarks,

  //         wah_s1_cmi_q08_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q08.choice,
  //         wah_s1_cmi_q08_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q08.remarks,

  //         wah_s1_cmi_q09_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q09.choice,
  //         wah_s1_cmi_q09_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q09.remarks,

  //         wah_s1_cmi_q10_choice: data.workAtHeight.sectionOne.controlMeasuresImplemented.q10.choice,
  //         wah_s1_cmi_q10_remarks: data.workAtHeight.sectionOne.controlMeasuresImplemented.q10.remarks,

  //         wah_s1_cmi_q11_specify: data.workAtHeight.sectionOne.controlMeasuresImplemented.q11.specify,
          
  //         adets_one_id: data.attendantDets[0].id,
  //         adets_one_name: data.attendantDets[0].name,
  //         adets_one_nric_or_fin_no: data.attendantDets[0].nricOrFinNo,
  //         adets_one_contact_no: data.attendantDets[0].contactNo,

  //         adets_two_id: data.attendantDets[1].id,
  //         adets_two_name: data.attendantDets[1].name,
  //         adets_two_nric_or_fin_no: data.attendantDets[1].nricOrFinNo,
  //         adets_two_contact_no: data.attendantDets[1].contactNo,

  //         adets_three_id: data.attendantDets[2].id,
  //         adets_three_name: data.attendantDets[2].name,
  //         adets_three_nric_or_fin_no: data.attendantDets[2].nricOrFinNo,
  //         adets_three_contact_no: data.attendantDets[2].contactNo,

  //         adets_four_id: data.attendantDets[3].id,
  //         adets_four_name: data.attendantDets[3].name,
  //         adets_four_nric_or_fin_no: data.attendantDets[3].nricOrFinNo,
  //         adets_four_contact_no: data.attendantDets[3].contactNo,

  //         adets_five_id: data.attendantDets[4].id,
  //         adets_five_name: data.attendantDets[4].name,
  //         adets_five_nric_or_fin_no: data.attendantDets[4].nricOrFinNo,
  //         adets_five_contact_no: data.attendantDets[4].contactNo,

  //         adets_six_id: data.attendantDets[5].id,
  //         adets_six_name: data.attendantDets[5].name,
  //         adets_six_nric_or_fin_no: data.attendantDets[5].nricOrFinNo,
  //         adets_six_contact_no: data.attendantDets[5].contactNo,
          
  //         to_email: data.applicantDets.email
  //       };

  //       break;

  //     case PermitTypes.CONFINED_SPACE:
  //       templateId = "template_zzrdq1r";

  //       templateParams = {
  //         to_name: data.applicantDets.name,
  //         from_name: "Temasek Polytechnic PTW E-Mng System",
    
  //         ptw_id: data.ptwId,
  //         loc_main: data.locationOfWork.main,
  //         loc_sub: data.locationOfWork.sub,
  //         permit_type: data.permitType,
  //         start_datetime: new Date(data.startWorkingDateTime).toLocaleString(),
  //         end_datetime: new Date(data.endWorkingDateTime).toLocaleString(),
  //         task_desc: data.taskDescription,
  //         no_of_workers: data.noOfWorkers,
  //         no_of_spvs: data.noOfSupervisors,
  //         apl_nric_fin_no: data.applicantDets.nricOrFinNo,
  //         apl_org_name: data.applicantDets.orgName,
  //         apl_org_type: data.applicantDets.orgType,
  //         apl_dep_name: data.applicantDets.depName,
  //         apl_contact_no: data.applicantDets.contactNo,

  //         cs_s1_ph_atmo: data.confinedSpace.sectionOne.potentialHazards.atmo,
  //         cs_s1_ph_non_atmo: data.confinedSpace.sectionOne.potentialHazards.nonAtmo,

  //         cs_s1_cmi_per_q01_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q01,
  //         cs_s1_cmi_per_q02_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q02,
  //         cs_s1_cmi_per_q03_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q03,
  //         cs_s1_cmi_per_q04_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q04,
  //         cs_s1_cmi_per_q05_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q05,
  //         cs_s1_cmi_per_q06_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q06,
  //         cs_s1_cmi_per_q07_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q07,
  //         cs_s1_cmi_per_q08_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q08,

  //         cs_s1_cmi_ppe_q01_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q01,
  //         cs_s1_cmi_ppe_q02_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q02,
  //         cs_s1_cmi_ppe_q03_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q03,
  //         cs_s1_cmi_ppe_q04_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q04,
  //         cs_s1_cmi_ppe_q05_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q05,
  //         cs_s1_cmi_ppe_q06_checked: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q06,
  //         cs_s1_cmi_ppe_q07_specify: data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q07.specify,

  //         adets_one_id: data.attendantDets[0].id,
  //         adets_one_name: data.attendantDets[0].name,
  //         adets_one_nric_or_fin_no: data.attendantDets[0].nricOrFinNo,
  //         adets_one_contact_no: data.attendantDets[0].contactNo,

  //         adets_two_id: data.attendantDets[1].id,
  //         adets_two_name: data.attendantDets[1].name,
  //         adets_two_nric_or_fin_no: data.attendantDets[1].nricOrFinNo,
  //         adets_two_contact_no: data.attendantDets[0].contactNo,

  //         adets_three_id: data.attendantDets[2].id,
  //         adets_three_name: data.attendantDets[2].name,
  //         adets_three_nric_or_fin_no: data.attendantDets[2].nricOrFinNo,
  //         adets_three_contact_no: data.attendantDets[2].contactNo,

  //         adets_four_id: data.attendantDets[3].id,
  //         adets_four_name: data.attendantDets[3].name,
  //         adets_four_nric_or_fin_no: data.attendantDets[3].nricOrFinNo,
  //         adets_four_contact_no: data.attendantDets[3].contactNo,

  //         adets_five_id: data.attendantDets[4].id,
  //         adets_five_name: data.attendantDets[4].name,
  //         adets_five_nric_or_fin_no: data.attendantDets[4].nricOrFinNo,
  //         adets_five_contact_no: data.attendantDets[4].contactNo,

  //         adets_six_id: data.attendantDets[5].id,
  //         adets_six_name: data.attendantDets[5].name,
  //         adets_six_nric_or_fin_no: data.attendantDets[5].nricOrFinNo,
  //         adets_six_contact_no: data.attendantDets[5].contactNo,
    
  //         to_email: data.applicantDets.email
  //       };
      
  //       break;
  //   }

  //   emailjs.send("service_5huddur", templateId, templateParams, "hvO-T9Y0HlU-ELTjP")
  //   .then((resp: any) => {
  //     console.log("Email statement has been successfully sent.", resp.status, resp.text);
  //     this.openSnackBar("Email statement has been successfully sent.", "", 3000);
  //   }, (err: any) => {
  //     console.log("Failed to send email statement.", err);
  //     this.openSnackBar("Failed to send email statement.", "", 3000);
  //   });
  // }

  public send(data: IPermitToWork, type: string): void {
    var templateId = "template_bf8cssj";
    var templateParams = {};

    switch (type) {
      case PermitTypes.WORK_AT_HEIGHT:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          perm_status: data.ptwStatus.permitStatus.toUpperCase(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          task_desc: data.taskDescription,
          no_of_workers: data.noOfWorkers,
          no_of_spvs: data.noOfSupervisors,
          apl_nric_fin_no: data.applicantDets.nricOrFinNo,
          apl_org_name: data.applicantDets.orgName,
          apl_org_type: data.applicantDets.orgType,
          apl_dep_name: data.applicantDets.depName,
          apl_contact_no: data.applicantDets.contactNo,

          safety_measures: `
            <div>
              <span>
                <ol>
                  <li>
                    <p>Due consideration given to eliminate work at heights tasks. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q01.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Safe means of access or egress provided. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q02.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Edge protection provided wherever there is falling risks. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q03.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Fall prevention equipment used to provide access or work platform. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q04.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q04.remarks}</p>
                  </li>
                  <li>
                    <p>Fall prevention equipment are adequate and in good condition. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q05.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q05.remarks}</p>
                  </li>
                  <li>
                    <p>Anchorage/lifeline installed and inspected by competent person. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q06.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q06.remarks}</p>
                  </li>
                  <li>
                    <p>Travel restraint system used to exclude persons from falling risks. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q07.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q07.remarks}</p>
                  </li>
                  <li>
                    <p>All persons subjected to falling risks are equipped with PFAS. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q08.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q08.remarks}</p>
                  </li>
                  <li>
                    <p>All personnel are adequately trained to perform work at heights. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q09.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q09.remarks}</p>
                  </li>
                  <li>
                    <p>Hazards and risk assessment are conducted and communicated. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q10.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q10.remarks}</p>
                  </li>
                  <li>
                    <p>Others: ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q11.specify}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          eval_passed: data.safetyAssessorEvaluation.passed? "Yes" : "No",
          eval_name: data.safetyAssessorEvaluation.name,
          eval_timestamp: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span><p><b><u>Assessment of Control Measures</u></b></p></span>
              <span>
                <ul>
                  <li>
                    <p>All reasonably practicable measures have been taken. (${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q01.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Verification of documents/ interview workers/ others. (${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q02.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q02.remarks}</p>
                  </li>
                </ul>
              </span>
              <span><p><b><u>Site Survey from Supervisors</u></b></p></span>
              <span>
                <ul>
                  <li>
                    <p>All persons on site are protected from falling risks. (${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q01.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Surrounding areas do not pose additional hazards. (${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q02.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q02.remarks}</p>
                  </li>
                </ul>
              </span>
              <span><p><b><u>Multiple Locations/Extended Duration</u></b></p></span>
              <span>
                <ul>
                  <li>
                    <p>Hazards are common at various locations/ time period. (${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q01.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures are applicable and effective. (${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q02.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q02.remarks}</p>
                  </li>
                </ul>
              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_timestamp: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>
              <span><p><b><u>Review of Permit</u></b></p></span>
              <span>
                <ul>
                  <li>
                    <p>Proper permit-to-work evaluation has been completed. (${data.workAtHeight.sectionThree.permitReview.q01.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q01.remarks}</p>
                  </li>
                  <li>
                    <p>No incompatible works that may pose additional hazards. (${data.workAtHeight.sectionThree.permitReview.q02.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures have been implemented effectively. (${data.workAtHeight.sectionThree.permitReview.q03.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Fall from heights risks have been effectively mitigated. (${data.workAtHeight.sectionThree.permitReview.q04.choice})</p>
                    <p><i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q04.remarks}</p>
                  </li>
                </ul>
              </span>
            </div>
          `,
          
          adets_one_id: data.attendantDets[0].id,
          adets_one_name: data.attendantDets[0].name,
          adets_one_nric_or_fin_no: data.attendantDets[0].nricOrFinNo,
          adets_one_contact_no: data.attendantDets[0].contactNo,

          adets_two_id: data.attendantDets[1].id,
          adets_two_name: data.attendantDets[1].name,
          adets_two_nric_or_fin_no: data.attendantDets[1].nricOrFinNo,
          adets_two_contact_no: data.attendantDets[1].contactNo,

          adets_three_id: data.attendantDets[2].id,
          adets_three_name: data.attendantDets[2].name,
          adets_three_nric_or_fin_no: data.attendantDets[2].nricOrFinNo,
          adets_three_contact_no: data.attendantDets[2].contactNo,

          adets_four_id: data.attendantDets[3].id,
          adets_four_name: data.attendantDets[3].name,
          adets_four_nric_or_fin_no: data.attendantDets[3].nricOrFinNo,
          adets_four_contact_no: data.attendantDets[3].contactNo,

          adets_five_id: data.attendantDets[4].id,
          adets_five_name: data.attendantDets[4].name,
          adets_five_nric_or_fin_no: data.attendantDets[4].nricOrFinNo,
          adets_five_contact_no: data.attendantDets[4].contactNo,

          adets_six_id: data.attendantDets[5].id,
          adets_six_name: data.attendantDets[5].name,
          adets_six_nric_or_fin_no: data.attendantDets[5].nricOrFinNo,
          adets_six_contact_no: data.attendantDets[5].contactNo,
          
          to_email: data.applicantDets.email
        };

        break;

      case PermitTypes.CONFINED_SPACE:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          perm_status: data.ptwStatus.permitStatus.toUpperCase(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          task_desc: data.taskDescription,
          no_of_workers: data.noOfWorkers,
          no_of_spvs: data.noOfSupervisors,
          apl_nric_fin_no: data.applicantDets.nricOrFinNo,
          apl_org_name: data.applicantDets.orgName,
          apl_org_type: data.applicantDets.orgType,
          apl_dep_name: data.applicantDets.depName,
          apl_contact_no: data.applicantDets.contactNo,

          safety_measures: `
            <div>
              <span>
                <span><p><b><u>Potential Confined Space (CS) Hazards</u></b></p></span>
              </span>
            </div>
          `,
          eval_passed: data.safetyAssessorEvaluation.passed? "Yes" : "No",
          eval_name: data.safetyAssessorEvaluation.name,
          eval_timestamp: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span>

              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_timestamp: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>

            </div>
          `,

          adets_one_id: data.attendantDets[0].id,
          adets_one_name: data.attendantDets[0].name,
          adets_one_nric_or_fin_no: data.attendantDets[0].nricOrFinNo,
          adets_one_contact_no: data.attendantDets[0].contactNo,

          adets_two_id: data.attendantDets[1].id,
          adets_two_name: data.attendantDets[1].name,
          adets_two_nric_or_fin_no: data.attendantDets[1].nricOrFinNo,
          adets_two_contact_no: data.attendantDets[0].contactNo,

          adets_three_id: data.attendantDets[2].id,
          adets_three_name: data.attendantDets[2].name,
          adets_three_nric_or_fin_no: data.attendantDets[2].nricOrFinNo,
          adets_three_contact_no: data.attendantDets[2].contactNo,

          adets_four_id: data.attendantDets[3].id,
          adets_four_name: data.attendantDets[3].name,
          adets_four_nric_or_fin_no: data.attendantDets[3].nricOrFinNo,
          adets_four_contact_no: data.attendantDets[3].contactNo,

          adets_five_id: data.attendantDets[4].id,
          adets_five_name: data.attendantDets[4].name,
          adets_five_nric_or_fin_no: data.attendantDets[4].nricOrFinNo,
          adets_five_contact_no: data.attendantDets[4].contactNo,

          adets_six_id: data.attendantDets[5].id,
          adets_six_name: data.attendantDets[5].name,
          adets_six_nric_or_fin_no: data.attendantDets[5].nricOrFinNo,
          adets_six_contact_no: data.attendantDets[5].contactNo,
    
          to_email: data.applicantDets.email
        };
      
        break;
    }

    emailjs.send("service_5huddur", templateId, templateParams, "hvO-T9Y0HlU-ELTjP")
    .then((resp: any) => {
      console.log("Email statement has been successfully sent.", resp.status, resp.text);
      this.openSnackBar("Email statement has been successfully sent.", "", 3000);
    }, (err: any) => {
      console.log("Failed to send email statement.", err);
      this.openSnackBar("Failed to send email statement.", "", 3000);
    });
  }

  public openSnackBar(msg: string, action: string, duration: number): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }
}