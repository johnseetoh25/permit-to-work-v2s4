import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { PermitTypes } from '../constants/PermitTypes';
import { PermitStatus } from '../constants/PermitStatus';
import { DefaultValues } from '../constants/DefaultValues';
import { RequestStatus } from '../constants/RequestStatus';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  public send(data: IPermitToWork, type: string): void {
    var templateId = "template_bf8cssj";
    var templateParams = {};

    switch (type) {
      case PermitTypes.WORK_AT_HEIGHT:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          canc_req: data.wantToCancel? "Yes" : "No",
          canc_req_ts: data.wantToCancel? "(on " + new Date(data.reqCancTimestamp).toLocaleString() + ")" : "",
          canc_ts: data.cancelledTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.cancelledTimestamp).toLocaleString(),

          perm_status: data.ptwStatus.permitStatus == PermitStatus.STATUS_INVALID? "INVALID" : data.ptwStatus.permitStatus.toUpperCase(),
          cloterm_req: data.ptwStatus.wantToTerminate? "Yes" : "No",
          cloterm_req_ts: data.ptwStatus.wantToTerminate? "(on " + new Date(data.ptwStatus.reqTermTimestamp).toLocaleString() + ")" : "",
          cloterm_rs: data.ptwStatus.remarks,
          cloterm_ts: data.ptwStatus.terminatedTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.ptwStatus.terminatedTimestamp).toLocaleString(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          //task_desc: data.taskDescription,
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
                    <p>Due consideration given to eliminate work at heights tasks. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q01.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Safe means of access or egress provided. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q02.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Edge protection provided wherever there is falling risks. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q03.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Fall prevention equipment used to provide access or work platform. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q04.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q04.remarks}</p>
                  </li>
                  <li>
                    <p>Fall prevention equipment are adequate and in good condition. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q05.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q05.remarks}</p>
                  </li>
                  <li>
                    <p>Anchorage/lifeline installed and inspected by competent person. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q06.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q06.remarks}</p>
                  </li>
                  <li>
                    <p>Travel restraint system used to exclude persons from falling risks. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q07.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q07.remarks}</p>
                  </li>
                  <li>
                    <p>All persons subjected to falling risks are equipped with PFAS. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q08.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q08.remarks}</p>
                  </li>
                  <li>
                    <p>All personnel are adequately trained to perform work at heights. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q09.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q09.remarks}</p>
                  </li>
                  <li>
                    <p>Hazards and risk assessment are conducted and communicated. (${data.workAtHeight.sectionOne.controlMeasuresImplemented.q10.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionOne.controlMeasuresImplemented.q10.remarks}</p>
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
          eval_ts: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span><p><b><u>Assessment of Control Measures</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>All reasonably practicable measures have been taken. (${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q01.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Verification of documents/ interview workers/ others. (${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q02.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionTwo.assessmentOfControlMeasures.q02.remarks}</p>
                  </li>
                </ol>
              </span>
              <span><p><b><u>Site Survey from Supervisors</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>All persons on site are protected from falling risks. (${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q01.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Surrounding areas do not pose additional hazards. (${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q02.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionTwo.siteSurveyFromSupervisor.q02.remarks}</p>
                  </li>
                </ol>
              </span>
              <span><p><b><u>Multiple Locations/Extended Duration</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>Hazards are common at various locations/ time period. (${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q01.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q01.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures are applicable and effective. (${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q02.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionTwo.multiLocOrExtentedDuration.q02.remarks}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_ts: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>
              <span><p><b><u>Review of Permit</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>Proper permit-to-work evaluation has been completed. (${data.workAtHeight.sectionThree.permitReview.q01.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q01.remarks}</p>
                  </li>
                  <li>
                    <p>No incompatible works that may pose additional hazards. (${data.workAtHeight.sectionThree.permitReview.q02.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures have been implemented effectively. (${data.workAtHeight.sectionThree.permitReview.q03.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Fall from heights risks have been effectively mitigated. (${data.workAtHeight.sectionThree.permitReview.q04.choice})&emsp;<i>Remarks:</i> ${data.workAtHeight.sectionThree.permitReview.q04.remarks}</p>
                  </li>
                </ol>
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
          
          to_email: data.applicantDets.email,
          bcc_to: "",
          cc_to: "temasek.polytechnic.ptwemsys@gmail.com"
        };

        break;

      case PermitTypes.CONFINED_SPACE:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          canc_req: data.wantToCancel? "Yes" : "No",
          canc_req_ts: data.wantToCancel? "(on " + new Date(data.reqCancTimestamp).toLocaleString() + ")" : "",
          canc_ts: data.cancelledTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.cancelledTimestamp).toLocaleString(),

          perm_status: data.ptwStatus.permitStatus == PermitStatus.STATUS_INVALID? "INVALID" : data.ptwStatus.permitStatus.toUpperCase(),
          cloterm_req: data.ptwStatus.wantToTerminate? "Yes" : "No",
          cloterm_req_ts: data.ptwStatus.wantToTerminate? "(on " + new Date(data.ptwStatus.reqTermTimestamp).toLocaleString() + ")" : "",
          cloterm_rs: data.ptwStatus.remarks,
          cloterm_ts: data.ptwStatus.terminatedTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.ptwStatus.terminatedTimestamp).toLocaleString(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          //task_desc: data.taskDescription,
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
                <span>
                  <ol>
                    <li>
                      <p>Potential atmospheric hazard(s): ${data.confinedSpace.sectionOne.potentialHazards.atmo}</p>
                    </li>
                    <li>
                      <p>Potential non-atmospheric hazard(s): ${data.confinedSpace.sectionOne.potentialHazards.nonAtmo}</p>
                    </li>
                  </ol>
                </span>
                <span><p><b><u>Confined Space (CS) Control Measures Implemented</u></b></p></span>
                <span><p><u>Pre-Entry Requirements</u></p></span>
                <span>
                  <ol>
                    <li>
                      <p>Ventilation (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q01})</p>
                    </li>
                    <li>
                      <p>Lighting (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q02})</p>
                    </li>
                    <li>
                      <p>Barricades and signboards (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q03})</p>
                    </li>
                    <li>
                      <p>De-energisation/lockout-tag out (LOTO) (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q04})</p>
                    </li>
                    <li>
                      <p>Blanking/bleeding of pipes (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q05})</p>
                    </li>
                    <li>
                      <p>Personal gas detector (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q06})</p>
                    </li>
                    <li>
                      <p>Personal gas detector (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q07})</p>
                    </li>
                    <li>
                      <p>Flame-proof light (${data.confinedSpace.sectionOne.controlMeasuresImplemented.preEntryReqs.q08})</p>
                    </li>
                  </ol>
                </span>
                <span><p><u>Personal Protective Equipment (PPE)</u></p></span>
                <span>
                  <ol>
                    <li>
                      <p>Safety helmet (${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q01})</p>
                    </li>
                    <li>
                      <p>Eye protection (${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q02})</p>
                    </li>
                    <li>
                      <p>Hand protection (${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q03})</p>
                    </li>
                    <li>
                      <p>Safety harness/lifelines (${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q04})</p>
                    </li>
                    <li>
                      <p>Respiratory protection (${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q05})</p>
                    </li>
                    <li>
                      <p>Name/identification badge (${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q06})</p>
                    </li>
                    <li>
                      <p>Other PPE: ${data.confinedSpace.sectionOne.controlMeasuresImplemented.ppe.q07.specify}</p>
                    </li>
                  </ol>
                </span>
              </span>
            </div>
          `,
          eval_passed: data.safetyAssessorEvaluation.passed? "Yes" : "No",
          eval_name: data.safetyAssessorEvaluation.name,
          eval_ts: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span>
                <span><p><b><u>Gas Monitoring Results</u></b></p></span>
                <span>
                  <ol>
                    <li>
                      <p>Oxygen (O₂) gas: ${data.confinedSpace.sectionTwo.gasMonitoringRes.oxygenLevel}%</p>
                    </li>
                    <li>
                      <p>Flammable gas: ${data.confinedSpace.sectionTwo.gasMonitoringRes.flammableGasLevel}% LEL</p>
                    </li>
                    <li>
                      <p>Toxic gas: ${data.confinedSpace.sectionTwo.gasMonitoringRes.toxicGasLevel} ppm</p>
                    </li>
                    <li>
                      <p>Fit for entry?: ${data.confinedSpace.sectionTwo.gasMonitoringRes.fitForEntry? "Yes" : "No"}</p>
                    </li>
                  </ol>
                </span>
              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_ts: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>
              <span>
                <span><p><b><u>Review of Permit</u></b></p></span>
                <span>
                  <ol>
                    <li>
                      <p>The levels of oxygen, flammable gas and toxic substances are within the permissible range. (${data.confinedSpace.sectionThree.permitReview.q01})</p>
                    </li>
                    <li>
                      <p>The confined space is adequately	ventilated. (${data.confinedSpace.sectionThree.permitReview.q02})</p>
                    </li>
                    <li>
                      <p>Effective steps have been taken to prevent any ingress of dangerous gases, vapours or any other dangerous substances into the confined space. (${data.confinedSpace.sectionThree.permitReview.q03})</p>
                    </li>
                    <li>
                      <p>All reasonably practicable measures have been taken to ensure the safety and health of persons who will be entering or working in the confined space. (${data.confinedSpace.sectionThree.permitReview.q04})</p>
                    </li>
                  </ol>
                </span>
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
    
          to_email: data.applicantDets.email,
          bcc_to: "",
          cc_to: "temasek.polytechnic.ptwemsys@gmail.com"
        };
      
        break;
    
      case PermitTypes.HOT_WORK:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          canc_req: data.wantToCancel? "Yes" : "No",
          canc_req_ts: data.wantToCancel? "(on " + new Date(data.reqCancTimestamp).toLocaleString() + ")" : "",
          canc_ts: data.cancelledTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.cancelledTimestamp).toLocaleString(),

          perm_status: data.ptwStatus.permitStatus == PermitStatus.STATUS_INVALID? "INVALID" : data.ptwStatus.permitStatus.toUpperCase(),
          cloterm_req: data.ptwStatus.wantToTerminate? "Yes" : "No",
          cloterm_req_ts: data.ptwStatus.wantToTerminate? "(on " + new Date(data.ptwStatus.reqTermTimestamp).toLocaleString() + ")" : "",
          cloterm_rs: data.ptwStatus.remarks,
          cloterm_ts: data.ptwStatus.terminatedTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.ptwStatus.terminatedTimestamp).toLocaleString(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          //task_desc: data.taskDescription,
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
                    <p>A risk assessment has been completed. (${data.hotWork.sectionOne.controlMeasuresImplemented.q01.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q01.remarks}</p>
                  </li>
                  <li>
                    <p>The worker(s) are trained and competent to conduct hot work. (${data.hotWork.sectionOne.controlMeasuresImplemented.q02.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Combustible materials have been removed from the area of hot work. (${data.hotWork.sectionOne.controlMeasuresImplemented.q03.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Fire resistance sheeting has been used to protect the area of hot work. (${data.hotWork.sectionOne.controlMeasuresImplemented.q04.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q04.remarks}</p>
                  </li>
                  <li>
                    <p>The potential of the presence of flammable vapor has been checked and LEL is < 3%. (${data.hotWork.sectionOne.controlMeasuresImplemented.q05.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q05.remarks}</p>
                  </li>
                  <li>
                    <p>Hot work equipment (e.g.: welding kit) has been inspected and is in a good condition. (${data.hotWork.sectionOne.controlMeasuresImplemented.q06.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q06.remarks}</p>
                  </li>
                  <li>
                    <p>A second man or fire watch is in place for the hot work. (${data.hotWork.sectionOne.controlMeasuresImplemented.q07.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q07.remarks}</p>
                  </li>
                  <li>
                    <p>Hot work workers are equipped with appropriate PPE (e.g.: welding mask, protective gloves etc.). (${data.hotWork.sectionOne.controlMeasuresImplemented.q08.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q08.remarks}</p>
                  </li>
                  <li>
                    <p>Ventilation to remove hazardous welding fumes is in place. (${data.hotWork.sectionOne.controlMeasuresImplemented.q09.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q09.remarks}</p>
                  </li>
                  <li>
                    <p>Fire extinguisher is in place near hot work. (${data.hotWork.sectionOne.controlMeasuresImplemented.q10.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q10.remarks}</p>
                  </li>
                  <li>
                    <p>First aid kit is in place near hot work in the event of burns. (${data.hotWork.sectionOne.controlMeasuresImplemented.q11.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionOne.controlMeasuresImplemented.q11.remarks}</p>
                  </li>
                  <li>
                    <p>Other precautions required to undertake the work safely: ${data.hotWork.sectionOne.controlMeasuresImplemented.q12.specify}</p>
                  </li>
                  <li>
                    <p>Other safety equipment required to undertake the work safely: ${data.hotWork.sectionOne.controlMeasuresImplemented.q13.specify}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          eval_passed: data.safetyAssessorEvaluation.passed? "Yes" : "No",
          eval_name: data.safetyAssessorEvaluation.name,
          eval_ts: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span><p><b><u>Assessment of Control Measures</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>All reasonably practicable measures have been taken. (${data.hotWork.sectionTwo.assessment.q01.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionTwo.assessment.q01.remarks}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_ts: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>
              <span><p><b><u>Review of Permit</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>Proper permit-to-work evaluation has been completed. (${data.hotWork.sectionThree.permitReview.q01.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionThree.permitReview.q01.remarks}</p>
                  </li>
                  <li>
                    <p>No incompatible works that may pose additional hazards. (${data.hotWork.sectionThree.permitReview.q02.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionThree.permitReview.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures have been implemented effectively. (${data.hotWork.sectionThree.permitReview.q03.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionThree.permitReview.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Hot work risks have been effectively mitigated. (${data.hotWork.sectionThree.permitReview.q04.choice})&emsp;<i>Remarks:</i> ${data.hotWork.sectionThree.permitReview.q04.remarks}</p>
                  </li>
                </ol>
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
          
          to_email: data.applicantDets.email,
          bcc_to: "",
          cc_to: "temasek.polytechnic.ptwemsys@gmail.com"
        };

        break;
      
      case PermitTypes.COLD_WORK:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          canc_req: data.wantToCancel? "Yes" : "No",
          canc_req_ts: data.wantToCancel? "(on " + new Date(data.reqCancTimestamp).toLocaleString() + ")" : "",
          canc_ts: data.cancelledTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.cancelledTimestamp).toLocaleString(),

          perm_status: data.ptwStatus.permitStatus == PermitStatus.STATUS_INVALID? "INVALID" : data.ptwStatus.permitStatus.toUpperCase(),
          cloterm_req: data.ptwStatus.wantToTerminate? "Yes" : "No",
          cloterm_req_ts: data.ptwStatus.wantToTerminate? "(on " + new Date(data.ptwStatus.reqTermTimestamp).toLocaleString() + ")" : "",
          cloterm_rs: data.ptwStatus.remarks,
          cloterm_ts: data.ptwStatus.terminatedTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.ptwStatus.terminatedTimestamp).toLocaleString(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          //task_desc: data.taskDescription,
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
                    <p>A risk assessment has been completed. (${data.coldWork.sectionOne.controlMeasuresImplemented.q01.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q01.remarks}</p>
                  </li>
                  <li>
                    <p>The worker(s) are trained and competent to conduct the intended cold work. (${data.coldWork.sectionOne.controlMeasuresImplemented.q02.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Work environment is checked (e.g.: good ventilation, adequate lighting, and dry floor etc.). (${data.coldWork.sectionOne.controlMeasuresImplemented.q03.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Work equipment (e.g.: hand tool, power tool etc) has been inspected and is in a good condition. (${data.coldWork.sectionOne.controlMeasuresImplemented.q04.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q04.remarks}</p>
                  </li>
                  <li>
                    <p>Electrical and / or mechanical isolation has been undertaken. (${data.coldWork.sectionOne.controlMeasuresImplemented.q05.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q05.remarks}</p>
                  </li>
                  <li>
                    <p>No exposure to moving/ rotating machinery during cold work. (${data.coldWork.sectionOne.controlMeasuresImplemented.q06.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q06.remarks}</p>
                  </li>
                  <li>
                    <p>A second man or standby is in place for the cold work. (${data.coldWork.sectionOne.controlMeasuresImplemented.q07.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q07.remarks}</p>
                  </li>
                  <li>
                    <p>Workers are equipped with appropriate PPE (e.g.: safety helmet, protective gloves etc.). (${data.coldWork.sectionOne.controlMeasuresImplemented.q08.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q08.remarks}</p>
                  </li>
                  <li>
                    <p>First aid kit is in place near working area. (${data.coldWork.sectionOne.controlMeasuresImplemented.q09.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionOne.controlMeasuresImplemented.q09.remarks}</p>
                  </li>
                  <li>
                    <p>Other precautions required to undertake the work safely: ${data.coldWork.sectionOne.controlMeasuresImplemented.q10.specify}</p>
                  </li>
                  <li>
                    <p>Other safety equipment required to undertake the work safely: ${data.coldWork.sectionOne.controlMeasuresImplemented.q11.specify}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          eval_passed: data.safetyAssessorEvaluation.passed? "Yes" : "No",
          eval_name: data.safetyAssessorEvaluation.name,
          eval_ts: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span><p><b><u>Assessment of Control Measures</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>All reasonably practicable measures have been taken. (${data.coldWork.sectionTwo.assessment.q01.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionTwo.assessment.q01.remarks}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_ts: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>
              <span><p><b><u>Review of Permit</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>Proper permit-to-work evaluation has been completed. (${data.coldWork.sectionThree.permitReview.q01.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionThree.permitReview.q01.remarks}</p>
                  </li>
                  <li>
                    <p>No incompatible works that may pose additional hazards. (${data.coldWork.sectionThree.permitReview.q02.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionThree.permitReview.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures have been implemented effectively. (${data.coldWork.sectionThree.permitReview.q03.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionThree.permitReview.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Cold work risks have been effectively mitigated. (${data.coldWork.sectionThree.permitReview.q04.choice})&emsp;<i>Remarks:</i> ${data.coldWork.sectionThree.permitReview.q04.remarks}</p>
                  </li>
                </ol>
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
          
          to_email: data.applicantDets.email,
          bcc_to: "",
          cc_to: "temasek.polytechnic.ptwemsys@gmail.com"
        };

        break;
      
      case PermitTypes.ELECTRICAL:
        templateParams = {
          to_name: data.applicantDets.name,
          from_name: "Temasek Polytechnic PTW E-Mng System",

          req_status: data.requestStatus.toUpperCase(),
          canc_req: data.wantToCancel? "Yes" : "No",
          canc_req_ts: data.wantToCancel? "(on " + new Date(data.reqCancTimestamp).toLocaleString() + ")" : "",
          canc_ts: data.cancelledTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.cancelledTimestamp).toLocaleString(),

          perm_status: data.ptwStatus.permitStatus == PermitStatus.STATUS_INVALID? "INVALID" : data.ptwStatus.permitStatus.toUpperCase(),
          cloterm_req: data.ptwStatus.wantToTerminate? "Yes" : "No",
          cloterm_req_ts: data.ptwStatus.wantToTerminate? "(on " + new Date(data.ptwStatus.reqTermTimestamp).toLocaleString() + ")" : "",
          cloterm_rs: data.ptwStatus.remarks,
          cloterm_ts: data.ptwStatus.terminatedTimestamp == DefaultValues.VALUE_NONE? DefaultValues.VALUE_NONE : new Date(data.ptwStatus.terminatedTimestamp).toLocaleString(),
    
          ptw_id: data.ptwId,
          loc_main: data.locationOfWork.main,
          loc_sub: data.locationOfWork.sub,
          permit_type: data.permitType,
          start_datetime: "(" + new Date(data.startWorkingDateTime).toLocaleString() + ")",
          end_datetime: "(" + new Date(data.endWorkingDateTime).toLocaleString() + ")",
          //task_desc: data.taskDescription,
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
                    <p>A risk assessment has been completed. (${data.electrical.sectionOne.controlMeasuresImplemented.q01.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q01.remarks}</p>
                  </li>
                  <li>
                    <p>The worker(s) are trained and competent to conduct electrical work. (${data.electrical.sectionOne.controlMeasuresImplemented.q02.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Electrical supply is turned off. (${data.electrical.sectionOne.controlMeasuresImplemented.q03.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q03.remarks}</p>
                  </li>
                  <li>
                    <p>"Test for Dead" on the isolated equipment has been conducted. (${data.electrical.sectionOne.controlMeasuresImplemented.q04.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q04.remarks}</p>
                  </li>
                  <li>
                    <p>Flammable/ combustible substances are removed from the area. (${data.electrical.sectionOne.controlMeasuresImplemented.q05.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q05.remarks}</p>
                  </li>
                  <li>
                    <p>Electrical work equipment (e.g.: multimeter) has been inspected and is in a good condition. (${data.electrical.sectionOne.controlMeasuresImplemented.q06.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q06.remarks}</p>
                  </li>
                  <li>
                    <p>Electrical work workers are equipped with appropriate PPE (e.g.: insulating gloves, safety boots etc.). (${data.electrical.sectionOne.controlMeasuresImplemented.q07.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q07.remarks}</p>
                  </li>
                  <li>
                    <p>A second man or standby person is in place during live electrical test work. (${data.electrical.sectionOne.controlMeasuresImplemented.q08.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q08.remarks}</p>
                  </li>
                  <li>
                    <p>First aid kit is in place near electrical work in the event of electrical shock. (${data.electrical.sectionOne.controlMeasuresImplemented.q09.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionOne.controlMeasuresImplemented.q09.remarks}</p>
                  </li>
                  <li>
                    <p>Other precautions required to undertake the work safely: ${data.electrical.sectionOne.controlMeasuresImplemented.q10.specify}</p>
                  </li>
                  <li>
                    <p>Other safety equipment required to undertake the work safely: ${data.electrical.sectionOne.controlMeasuresImplemented.q11.specify}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          eval_passed: data.safetyAssessorEvaluation.passed? "Yes" : "No",
          eval_name: data.safetyAssessorEvaluation.name,
          eval_ts: new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.safetyAssessorEvaluation.timestamp).toLocaleString(),
          eval_dets: `
            <div>
              <span><p><b><u>Assessment of Control Measures</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>All reasonably practicable measures have been taken. (${data.electrical.sectionTwo.assessment.q01.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionTwo.assessment.q01.remarks}</p>
                  </li>
                </ol>
              </span>
            </div>
          `,
          apprej_passed: data.authorisedManagerApproval.passed? "Yes" : "No",
          apprej_name: data.authorisedManagerApproval.name,
          apprej_ts: new Date(data.authorisedManagerApproval.timestamp).toLocaleString() === "Invalid Date"? "None" : new Date(data.authorisedManagerApproval.timestamp).toLocaleString(),
          apprej_dets: `
            <div>
              <span><p><b><u>Review of Permit</u></b></p></span>
              <span>
                <ol>
                  <li>
                    <p>Proper permit-to-work evaluation has been completed. (${data.electrical.sectionThree.permitReview.q01.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionThree.permitReview.q01.remarks}</p>
                  </li>
                  <li>
                    <p>No incompatible works that may pose additional hazards. (${data.electrical.sectionThree.permitReview.q02.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionThree.permitReview.q02.remarks}</p>
                  </li>
                  <li>
                    <p>Control measures have been implemented effectively. (${data.electrical.sectionThree.permitReview.q03.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionThree.permitReview.q03.remarks}</p>
                  </li>
                  <li>
                    <p>Electrical risks have been effectively mitigated. (${data.electrical.sectionThree.permitReview.q04.choice})&emsp;<i>Remarks:</i> ${data.electrical.sectionThree.permitReview.q04.remarks}</p>
                  </li>
                </ol>
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
          
          to_email: data.applicantDets.email,
          bcc_to: "",
          cc_to: "temasek.polytechnic.ptwemsys@gmail.com"
        };

        break;
    }

    emailjs.send("service_5huddur", templateId, templateParams, "hvO-T9Y0HlU-ELTjP")
    .then((resp: any) => {
      console.log("Email notification has been successfully sent.", resp.status, resp.text);
      this.openSnackBar("Email notification has been successfully sent.", "", 3000);
    }, (err: any) => {
      console.log("Failed to send email notification.", err);
      this.openSnackBar("Failed to send email notification.", "", 3000);
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