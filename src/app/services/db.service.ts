import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPermitToWork } from '../interfaces/IPermitToWork';
import { AttendantDets } from '../interfaces/AttendantDets';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private ptwUrl: string = '/db/ptw';

  constructor(private http : HttpClient) { }

  public fetch(): Observable<IPermitToWork[]> {
    console.log(this.ptwUrl);
    return this.http.get<IPermitToWork[]>(this.ptwUrl);
  }

  public post(body: IPermitToWork | undefined): Observable<IPermitToWork | undefined> {
    const headers = { 
        'content-type': 'application/json' 
    };
    return this.http.post(this.ptwUrl, body, { 'headers': headers });
  }

  public fetchWith(id : number): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?id=" + id.toString());
  }

  public update(
    id?: number,
    ptwId?: string,
    permitType?: string,
    selectedLocationOfWork?: string,
    selectedLocationSector?: string,
    startWorkingDateTime?: string,
    endWorkingDateTime?: string,
    taskDescription?: string,
    noOfWorkers?: number,
    noOfSupervisors?: number,

    wah_s1_cmi_q01_choice?: string,
    wah_s1_cmi_q01_remarks?: string,
    wah_s1_cmi_q02_choice?: string,
    wah_s1_cmi_q02_remarks?: string,
    wah_s1_cmi_q03_choice?: string,
    wah_s1_cmi_q03_remarks?: string,
    wah_s1_cmi_q04_choice?: string,
    wah_s1_cmi_q04_remarks?: string,
    wah_s1_cmi_q05_choice?: string,
    wah_s1_cmi_q05_remarks?: string,
    wah_s1_cmi_q06_choice?: string,
    wah_s1_cmi_q06_remarks?: string,
    wah_s1_cmi_q07_choice?: string,
    wah_s1_cmi_q07_remarks?: string,
    wah_s1_cmi_q08_choice?: string,
    wah_s1_cmi_q08_remarks?: string,
    wah_s1_cmi_q09_choice?: string,
    wah_s1_cmi_q09_remarks?: string,
    wah_s1_cmi_q10_choice?: string,
    wah_s1_cmi_q10_remarks?: string,
    wah_s1_cmi_q11_specify?: string,

    wah_s2_acm_q01_choice?: string,
    wah_s2_acm_q01_remarks?: string,
    wah_s2_acm_q02_choice?: string,
    wah_s2_acm_q02_remarks?: string,

    wah_s2_ssfs_q01_choice?: string,
    wah_s2_ssfs_q01_remarks?: string,
    wah_s2_ssfs_q02_choice?: string,
    wah_s2_ssfs_q02_remarks?: string,

    wah_s2_mloed_q01_choice?: string,
    wah_s2_mloed_q01_remarks?: string,
    wah_s2_mloed_q02_choice?: string,
    wah_s2_mloed_q02_remarks?: string,

    wah_s3_pr_q01_choice?: string,
    wah_s3_pr_q01_remarks?: string,
    wah_s3_pr_q02_choice?: string,
    wah_s3_pr_q02_remarks?: string,
    wah_s3_pr_q03_choice?: string,
    wah_s3_pr_q03_remarks?: string,
    wah_s3_pr_q04_choice?: string,
    wah_s3_pr_q04_remarks?: string,

    cs_s1_ph_atmo?: string,
    cs_s1_ph_nonAtmo?: string,

    cs_s1_cmi_per_q01_checked?: string,
    cs_s1_cmi_per_q02_checked?: string,
    cs_s1_cmi_per_q03_checked?: string,
    cs_s1_cmi_per_q04_checked?: string,
    cs_s1_cmi_per_q05_checked?: string,
    cs_s1_cmi_per_q06_checked?: string,
    cs_s1_cmi_per_q07_checked?: string,
    cs_s1_cmi_per_q08_checked?: string,

    cs_s1_cmi_ppe_q01_checked?: string,
    cs_s1_cmi_ppe_q02_checked?: string,
    cs_s1_cmi_ppe_q03_checked?: string,
    cs_s1_cmi_ppe_q04_checked?: string,
    cs_s1_cmi_ppe_q05_checked?: string,
    cs_s1_cmi_ppe_q06_checked?: string,
    cs_s1_cmi_ppe_q07_specify?: string,

    cs_s2_gmr_oxygenLevel?: number,
    cs_s2_gmr_flammableGasLevel?: number,
    cs_s2_gmr_toxicGasLevel?: number,
    cs_s2_gmr_fitForEntry?: boolean,

    cs_s3_pr_q01_choice?: string,
    cs_s3_pr_q02_choice?: string,
    cs_s3_pr_q03_choice?: string,
    cs_s3_pr_q04_choice?: string,

    ad1_name?: string,
    ad1_nricOrFinNo?: string,
    ad1_contactNo?: string,

    ad2_name?: string,
    ad2_nricOrFinNo?: string,
    ad2_contactNo?: string,

    ad3_name?: string,
    ad3_nricOrFinNo?: string,
    ad3_contactNo?: string,

    ad4_name?: string,
    ad4_nricOrFinNo?: string,
    ad4_contactNo?: string,

    ad5_name?: string,
    ad5_nricOrFinNo?: string,
    ad5_contactNo?: string,

    ad_name?: string,
    ad_nricOrFinNo?: string,
    ad_orgType?: string,
    ad_orgName?: string,
    ad_depName?: string,
    ad_contactNo?: string,
    ad_email?: string,

    ptwStatus_permitStatus?: string,
    ptwStatus_taskStatus?: string,
    ptwStatus_remarks?: string,
    ptwStatus_checked?: boolean,
    ptwStatus_supervisorName?: string,
    ptwStatus_timestamp?: string,

    saEval_passed?: boolean,
    saEval_name?: string,
    saEval_timestamp?: string,

    amApproval_passed?: boolean,
    amApproval_name?: string,
    amApproval_timestamp?: string,

    checked?: boolean,
    reqStatus?: string,
    statusRemarks?: string,
    timestamp?: string
  ): void {
    const headers = { 
      'content-type': 'application/json' 
    };

    this.http.put(this.ptwUrl + "/" + id, 
      {
        ptwId: ptwId,
        locationOfWork: {
          main: selectedLocationOfWork,
          sub: selectedLocationSector
        },
        permitType: permitType,
        startWorkingDateTime: startWorkingDateTime,
        endWorkingDateTime: endWorkingDateTime,
        taskDescription: taskDescription,
        noOfWorkers: noOfWorkers,
        noOfSupervisors: noOfSupervisors,
        workAtHeight: {
          sectionOne: {
            controlMeasuresImplemented: {
              q01: {
                choice: wah_s1_cmi_q01_choice,
                remarks: wah_s1_cmi_q01_remarks,
              },
              q02: {
                choice: wah_s1_cmi_q02_choice,
                remarks: wah_s1_cmi_q02_remarks
              },
              q03: {
                choice: wah_s1_cmi_q03_choice,
                remarks: wah_s1_cmi_q03_remarks
              },
              q04: {
                choice: wah_s1_cmi_q04_choice,
                remarks: wah_s1_cmi_q04_remarks
              },
              q05: {
                choice: wah_s1_cmi_q05_choice,
                remarks: wah_s1_cmi_q05_remarks
              },
              q06: {
                choice: wah_s1_cmi_q06_choice,
                remarks: wah_s1_cmi_q06_remarks
              },
              q07: {
                choice: wah_s1_cmi_q07_choice,
                remarks: wah_s1_cmi_q07_remarks
              },
              q08: {
                choice: wah_s1_cmi_q08_choice,
                remarks: wah_s1_cmi_q08_remarks
              },
              q09: {
                choice: wah_s1_cmi_q09_choice,
                remarks: wah_s1_cmi_q09_remarks
              },
              q10: {
                choice: wah_s1_cmi_q10_choice,
                remarks: wah_s1_cmi_q10_remarks
              },
              q11: {
                specify: wah_s1_cmi_q11_specify
              }
            }
          },
          sectionTwo: {
            assessmentOfControlMeasures: {
              q01: {
                choice: wah_s2_acm_q01_choice,
                remarks: wah_s2_acm_q01_remarks
              },
              q02: {
                choice: wah_s2_acm_q02_choice,
                remarks: wah_s2_acm_q02_remarks
              }
            },
            siteSurveyFromSupervisor: {
              q01: {
                choice: wah_s2_ssfs_q01_choice,
                remarks: wah_s2_ssfs_q01_remarks
              },
              q02: {
                choice: wah_s2_ssfs_q02_choice,
                remarks: wah_s2_ssfs_q02_remarks
              }
            },
            multiLocOrExtentedDuration: {
              q01: {
                choice: wah_s2_mloed_q01_choice,
                remarks: wah_s2_mloed_q01_remarks
              },
              q02: {
                choice: wah_s2_mloed_q02_choice,
                remarks: wah_s2_mloed_q02_remarks
              }
            }
          },
          sectionThree: {
            permitReview: {
              q01: {
                choice: wah_s3_pr_q01_choice,
                remarks: wah_s3_pr_q01_remarks
              },
              q02: {
                choice: wah_s3_pr_q02_choice, 
                remarks: wah_s3_pr_q02_remarks
              },
              q03: {
                choice: wah_s3_pr_q03_choice,
                remarks: wah_s3_pr_q03_remarks
              },
              q04: {
                choice: wah_s3_pr_q04_choice,
                remarks: wah_s3_pr_q04_remarks
              }
            }
          }
        },
        confinedSpace: {
          sectionOne: {
            potentialHazards: {
              atmo: cs_s1_ph_atmo,
              nonAtmo: cs_s1_ph_nonAtmo
            },
            controlMeasuresImplemented: {
              preEntryReqs: {
                q01: cs_s1_cmi_per_q01_checked,
                q02: cs_s1_cmi_per_q02_checked,
                q03: cs_s1_cmi_per_q03_checked,
                q04: cs_s1_cmi_per_q04_checked,
                q05: cs_s1_cmi_per_q05_checked,
                q06: cs_s1_cmi_per_q06_checked,
                q07: cs_s1_cmi_per_q07_checked,
                q08: cs_s1_cmi_per_q08_checked
              },
              ppe: {
                q01: cs_s1_cmi_ppe_q01_checked,
                q02: cs_s1_cmi_ppe_q02_checked,
                q03: cs_s1_cmi_ppe_q03_checked,
                q04: cs_s1_cmi_ppe_q04_checked,
                q05: cs_s1_cmi_ppe_q05_checked,
                q06: cs_s1_cmi_ppe_q06_checked,
                q07: {
                  specify: cs_s1_cmi_ppe_q07_specify
                }
              }
            }
          },
          sectionTwo: {
            gasMonitoringRes: {
              oxygenLevel: cs_s2_gmr_oxygenLevel,
              flammableGasLevel: cs_s2_gmr_flammableGasLevel,
              toxicGasLevel: cs_s2_gmr_toxicGasLevel,
              fitForEntry: cs_s2_gmr_fitForEntry,
            }
          },
          sectionThree: {
            permitReview: {
              q01: cs_s3_pr_q01_choice,
              q02: cs_s3_pr_q02_choice,
              q03: cs_s3_pr_q03_choice,
              q04: cs_s3_pr_q04_choice
            }
          }
        },
        attendantDets: [
          {
            id: 1,
            name: ad1_name,
            nricOrFinNo: ad1_nricOrFinNo,
            contactNo: ad1_contactNo
          },
          {
            id: 2,
            name: ad2_name,
            nricOrFinNo: ad2_nricOrFinNo,
            contactNo: ad2_contactNo
          },
          {
            id: 3,
            name: ad3_name,
            nricOrFinNo: ad3_nricOrFinNo,
            contactNo: ad3_contactNo
          },
          {
            id: 4,
            name: ad4_name,
            nricOrFinNo: ad4_nricOrFinNo,
            contactNo: ad4_contactNo
          },
          {
            id: 5,
            name: ad5_name,
            nricOrFinNo: ad5_nricOrFinNo,
            contactNo: ad5_contactNo
          },
        ],
        applicantDets: {
          name: ad_name,
          nricOrFinNo: ad_nricOrFinNo,
          orgType: ad_orgType,
          orgName: ad_orgName,
          depName: ad_depName,
          contactNo: ad_contactNo,
          email: ad_email
        },
        dailyEndorsement: { },
        ptwStatus: {
          permitStatus: ptwStatus_permitStatus,
          taskStatus: ptwStatus_taskStatus,
          remarks: ptwStatus_remarks,
          checked: ptwStatus_checked,
          supervisorName: ptwStatus_supervisorName,
          timestamp: ptwStatus_timestamp
        },
        safetyAssessorEvaluation: {
          passed: saEval_passed,
          name: saEval_name,
          timestamp: saEval_timestamp
        },
        authorisedManagerApproval: {
          passed: amApproval_passed,
          name: amApproval_name,
          timestamp: amApproval_timestamp
        },
        checked: checked,
        requestStatus: reqStatus,
        statusRemarks: statusRemarks,
        timestamp: timestamp
      }, { "headers": headers }).subscribe(resp => {
        console.log(resp);
    });
  }
}