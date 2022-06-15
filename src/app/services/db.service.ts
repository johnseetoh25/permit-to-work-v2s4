import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPermitToWork } from '../interfaces/IPermitToWork';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private ptwUrl: string = '/api/ptw';

  constructor(private http : HttpClient) { }

  public fetch(): Observable<IPermitToWork[]> {
    console.log(this.ptwUrl);
    return this.http.get<IPermitToWork[]>(this.ptwUrl);
  }

  public post(body: IPermitToWork): Observable<IPermitToWork> {
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
    otherLocationOfWork?: string[],
    startWorkingDateTime?: Date,
    endWorkingDateTime?: Date,
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

    wah_s1_ard_name?: string,
    wah_s1_ard_nricOrFinNo?: string,
    wah_s1_ard_orgType?: string,
    wah_s1_ard_orgName?: string,
    wah_s1_ard_depName?: string,
    wah_s1_ard_contactNo?: string,

    wah_s1_checked?: boolean,
    wah_s1_supervisorName?: string,
    wah_s1_timestamp?: Date,

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

    wah_s2_checked?: boolean,
    wah_s2_safetyAssessorName?: string,
    wah_s2_timestamp?: Date,

    wah_s3_pr_q01_choice?: string,
    wah_s3_pr_q01_remarks?: string,
    wah_s3_pr_q02_choice?: string,
    wah_s3_pr_q02_remarks?: string,
    wah_s3_pr_q03_choice?: string,
    wah_s3_pr_q03_remarks?: string,
    wah_s3_pr_q04_choice?: string,
    wah_s3_pr_q04_remarks?: string,

    wah_s3_checked?: boolean,
    wah_s3_authorisedManagerName?: string,
    wah_s3_timestamp?: Date,

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

    cs_s1_ard_name?: string,
    cs_s1_ard_nricOrFinNo?: string,
    cs_s1_ard_orgType?: string,
    cs_s1_ard_orgName?: string,
    cs_s1_ard_depName?: string,
    cs_s1_ard_contactNo?: string,

    cs_s1_checked?: boolean,
    cs_s1_supervisorName?: string,
    cs_s1_timestamp?: string,

    cs_s2_gmr_oxygenLevel?: number,
    cs_s2_gmr_flammableGasLevel?: number,
    cs_s2_gmr_toxicGasLevel?: number,
    cs_s2_gmr_fitForEntry?: boolean,

    cs_s2_checked?: boolean,
    cs_s2_safetyAssessorName?: string,
    cs_s2_timestamp?: Date,

    cs_s3_pr_q01_choice?: string,
    cs_s3_pr_q02_choice?: string,
    cs_s3_pr_q03_choice?: string,
    cs_s3_pr_q04_choice?: string,

    cs_s3_checked?: boolean,
    cs_s3_authorisedManagerName?: string,
    cs_s3_timestamp?: Date,

    ad_name?: string,
    ad_nricOrFinNo?: string,
    ad_orgType?: string,
    ad_orgName?: string,
    ad_depName?: string,
    ad_contactNo?: string,
    ad_email?: string,

    ptwPost_checked?: boolean,
    ptwPost_supervisorName?: string,
    ptwPost_timestamp?: string,

    ptwStatus_taskStatus?: string,
    ptwStatus_remarks?: string,
    ptwStatus_checked?: boolean,
    ptwStatus_supervisorName?: string,
    ptwStatus_timestamp?: Date,

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
        permitType: permitType,
        locationOfWork: {
          option: selectedLocationOfWork,
          other: otherLocationOfWork
        },
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
            },
            attendantRepDets: {
              attendantRepName: wah_s1_ard_name,
              nricOrFinNo: wah_s1_ard_nricOrFinNo,
              orgType: wah_s1_ard_orgType,
              orgName: wah_s1_ard_orgName,
              depName: wah_s1_ard_depName,
              contactNo: wah_s1_ard_contactNo
            },
            checked: wah_s1_checked,
            supervisorName: wah_s1_supervisorName,
            timestamp: wah_s1_timestamp
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
            },
            checked: wah_s2_checked,
            safetyAssessorName: wah_s2_safetyAssessorName,
            timestamp: wah_s2_timestamp
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
            },
            checked: wah_s3_checked,
            authorisedManagerName: wah_s3_authorisedManagerName,
            timestamp: wah_s3_timestamp
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
            },
            attendantRepDets: {
              attendantRepName: cs_s1_ard_name,
              nricOrFinNo: cs_s1_ard_nricOrFinNo,
              orgType: cs_s1_ard_orgType,
              orgName: cs_s1_ard_orgName,
              depName: cs_s1_ard_depName,
              contactNo: cs_s1_ard_contactNo
            },
            checked: cs_s1_checked,
            supervisorName: cs_s1_supervisorName,
            timestamp: cs_s1_timestamp
          },
          sectionTwo: {
            gasMonitoringRes: {
              oxygenLevel: cs_s2_gmr_oxygenLevel, // 19.5% - 23.5%
              flammableGasLevel: cs_s2_gmr_flammableGasLevel, // Less than 10% LEL
              toxicGasLevel: cs_s2_gmr_toxicGasLevel, // ppm
              fitForEntry: cs_s2_gmr_fitForEntry, // Satisfied by gasMonitoringRes
            },
            checked: cs_s2_checked, // Ensure that info is verified & approved
            safetyAssessorName: cs_s2_safetyAssessorName,
            timestamp: cs_s2_timestamp
          },
          sectionThree: {
            permitReview: {
              q01: cs_s3_pr_q01_choice,
              q02: cs_s3_pr_q02_choice,
              q03: cs_s3_pr_q03_choice,
              q04: cs_s3_pr_q04_choice
            },
            checked: cs_s3_checked,
            authorisedManagerName: cs_s3_authorisedManagerName,
            timestamp: cs_s3_timestamp
          }
        },
        applicantDets: {
          name: ad_name,
          nricOrFinNo: ad_nricOrFinNo,
          orgType: ad_orgType,
          orgName: ad_orgName,
          depName: ad_depName,
          contactNo: ad_contactNo,
          email: ad_email
        },
        dailyEndorsement: {},
        ptwPost: {
          checked: ptwPost_checked,
          supervisorName: ptwPost_supervisorName,
          timestamp: ptwPost_timestamp
        },
        ptwStatus: {
          taskStatus: ptwStatus_taskStatus,
          remarks: ptwStatus_remarks,
          checked: ptwStatus_checked,
          supervisorName: ptwStatus_supervisorName,
          timestamp: ptwStatus_timestamp
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