import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPermitToWork } from '../interfaces/IPermitToWork';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PermitStatus } from '../constants/PermitStatus';
import { RequestStatus } from '../constants/RequestStatus';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private ptwUrl: string = 'https://db-ptw-sys-2.herokuapp.com/ptw';
  // private ptwUrl: string = 'db/ptw';

  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private http : HttpClient, private snackBar: MatSnackBar) { }

  public fetchAll(): Observable<IPermitToWork[]> {
    console.log(this.ptwUrl);
    return this.http.get<IPermitToWork[]>(this.ptwUrl);
  }

  public post(body: IPermitToWork = <IPermitToWork>{}): Observable<any> {
    const headers = { 
        'content-type': 'application/json' 
    };
    return this.http.post(this.ptwUrl, body, { 'headers': headers });
  }

  public fetchWith(param: string, value: string): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?"+ param + "=" + value);
  }

  public returnProcessingPermits(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.permitStatus=" + PermitStatus.STATUS_PROCESSING);
  }

  public returnValidPermits(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.permitStatus=" + PermitStatus.STATUS_VALID);
  }

  public returnInvalidPermits(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.permitStatus=" + PermitStatus.STATUS_INVALID);
  }

  public returnExpiredPermits(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.permitStatus=" + PermitStatus.STATUS_EXPIRED);
  }

  public returnTerminatedPermits(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.permitStatus=" + PermitStatus.STATUS_TERMINATED);
  }

  public returnClosedPermits(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.permitStatus=" + PermitStatus.STATUS_CLOSED);
  }

  public returnPendingReqs(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?requestStatus=" + RequestStatus.REQUEST_PENDING);
  }

  public returnCancReqs(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?wantToCancel=true&cancelledTimestamp=None");
  }

  public returnTermReqs(): Observable<IPermitToWork[]> {
    return this.http.get<IPermitToWork[]>(this.ptwUrl + "?ptwStatus.wantToTerminate=true&ptwStatus.terminatedTimestamp=None");
  }

  public update(
    id: number,
    ptwId: string,
    ptwYear: string,
    permitType: string,
    selectedLocationOfWork: string,
    selectedLocationSector: string,
    startWorkingDateTime: string,
    endWorkingDateTime: string,
    //taskDescription: string,
    predefinedTask: string,
    predefinedTaskOthers: string,
    noOfWorkers: number,
    noOfSupervisors: number,

    wah_s1_cmi_q01_choice: string,
    wah_s1_cmi_q01_remarks: string,
    wah_s1_cmi_q02_choice: string,
    wah_s1_cmi_q02_remarks: string,
    wah_s1_cmi_q03_choice: string,
    wah_s1_cmi_q03_remarks: string,
    wah_s1_cmi_q04_choice: string,
    wah_s1_cmi_q04_remarks: string,
    wah_s1_cmi_q05_choice: string,
    wah_s1_cmi_q05_remarks: string,
    wah_s1_cmi_q06_choice: string,
    wah_s1_cmi_q06_remarks: string,
    wah_s1_cmi_q07_choice: string,
    wah_s1_cmi_q07_remarks: string,
    wah_s1_cmi_q08_choice: string,
    wah_s1_cmi_q08_remarks: string,
    wah_s1_cmi_q09_choice: string,
    wah_s1_cmi_q09_remarks: string,
    wah_s1_cmi_q10_choice: string,
    wah_s1_cmi_q10_remarks: string,
    wah_s1_cmi_q11_specify: string,

    wah_s2_acm_q01_choice: string,
    wah_s2_acm_q01_remarks: string,
    wah_s2_acm_q02_choice: string,
    wah_s2_acm_q02_remarks: string,

    wah_s2_ssfs_q01_choice: string,
    wah_s2_ssfs_q01_remarks: string,
    wah_s2_ssfs_q02_choice: string,
    wah_s2_ssfs_q02_remarks: string,

    wah_s2_mloed_q01_choice: string,
    wah_s2_mloed_q01_remarks: string,
    wah_s2_mloed_q02_choice: string,
    wah_s2_mloed_q02_remarks: string,

    wah_s3_pr_q01_choice: string,
    wah_s3_pr_q01_remarks: string,
    wah_s3_pr_q02_choice: string,
    wah_s3_pr_q02_remarks: string,
    wah_s3_pr_q03_choice: string,
    wah_s3_pr_q03_remarks: string,
    wah_s3_pr_q04_choice: string,
    wah_s3_pr_q04_remarks: string,

    cs_s1_ph_atmo: string,
    cs_s1_ph_nonAtmo: string,

    cs_s1_cmi_per_q01_checked: string,
    cs_s1_cmi_per_q02_checked: string,
    cs_s1_cmi_per_q03_checked: string,
    cs_s1_cmi_per_q04_checked: string,
    cs_s1_cmi_per_q05_checked: string,
    cs_s1_cmi_per_q06_checked: string,
    cs_s1_cmi_per_q07_checked: string,
    cs_s1_cmi_per_q08_checked: string,

    cs_s1_cmi_ppe_q01_checked: string,
    cs_s1_cmi_ppe_q02_checked: string,
    cs_s1_cmi_ppe_q03_checked: string,
    cs_s1_cmi_ppe_q04_checked: string,
    cs_s1_cmi_ppe_q05_checked: string,
    cs_s1_cmi_ppe_q06_checked: string,
    cs_s1_cmi_ppe_q07_specify: string,

    cs_s2_gmr_oxygenLevel: number,
    cs_s2_gmr_flammableGasLevel: number,
    cs_s2_gmr_toxicGasLevel: number,
    cs_s2_gmr_fitForEntry: boolean,

    cs_s3_pr_q01_choice: string,
    cs_s3_pr_q02_choice: string,
    cs_s3_pr_q03_choice: string,
    cs_s3_pr_q04_choice: string,

    hw_s1_cmi_q01_choice: string,
    hw_s1_cmi_q01_remarks: string,
    hw_s1_cmi_q02_choice: string,
    hw_s1_cmi_q02_remarks: string,
    hw_s1_cmi_q03_choice: string,
    hw_s1_cmi_q03_remarks: string,
    hw_s1_cmi_q04_choice: string,
    hw_s1_cmi_q04_remarks: string,
    hw_s1_cmi_q05_choice: string,
    hw_s1_cmi_q05_remarks: string,
    hw_s1_cmi_q06_choice: string,
    hw_s1_cmi_q06_remarks: string,
    hw_s1_cmi_q07_choice: string,
    hw_s1_cmi_q07_remarks: string,
    hw_s1_cmi_q08_choice: string,
    hw_s1_cmi_q08_remarks: string,
    hw_s1_cmi_q09_choice: string,
    hw_s1_cmi_q09_remarks: string,
    hw_s1_cmi_q10_choice: string,
    hw_s1_cmi_q10_remarks: string,
    hw_s1_cmi_q11_choice: string,
    hw_s1_cmi_q11_remarks: string,
    hw_s1_cmi_q12_specify: string,
    hw_s1_cmi_q13_specify: string,

    hw_s2_a_q01_choice: string,
    hw_s2_a_q01_remarks: string,

    hw_s3_pr_q01_choice: string,
    hw_s3_pr_q01_remarks: string,
    hw_s3_pr_q02_choice: string,
    hw_s3_pr_q02_remarks: string,
    hw_s3_pr_q03_choice: string,
    hw_s3_pr_q03_remarks: string,
    hw_s3_pr_q04_choice: string,
    hw_s3_pr_q04_remarks: string,

    cw_s1_cmi_q01_choice: string,
    cw_s1_cmi_q01_remarks: string,
    cw_s1_cmi_q02_choice: string,
    cw_s1_cmi_q02_remarks: string,
    cw_s1_cmi_q03_choice: string,
    cw_s1_cmi_q03_remarks: string,
    cw_s1_cmi_q04_choice: string,
    cw_s1_cmi_q04_remarks: string,
    cw_s1_cmi_q05_choice: string,
    cw_s1_cmi_q05_remarks: string,
    cw_s1_cmi_q06_choice: string,
    cw_s1_cmi_q06_remarks: string,
    cw_s1_cmi_q07_choice: string,
    cw_s1_cmi_q07_remarks: string,
    cw_s1_cmi_q08_choice: string,
    cw_s1_cmi_q08_remarks: string,
    cw_s1_cmi_q09_choice: string,
    cw_s1_cmi_q09_remarks: string,
    cw_s1_cmi_q10_specify: string,
    cw_s1_cmi_q11_specify: string,

    cw_s2_a_q01_choice: string,
    cw_s2_a_q01_remarks: string,

    cw_s3_pr_q01_choice: string,
    cw_s3_pr_q01_remarks: string,
    cw_s3_pr_q02_choice: string,
    cw_s3_pr_q02_remarks: string,
    cw_s3_pr_q03_choice: string,
    cw_s3_pr_q03_remarks: string,
    cw_s3_pr_q04_choice: string,
    cw_s3_pr_q04_remarks: string,

    e_s1_cmi_q01_choice: string,
    e_s1_cmi_q01_remarks: string,
    e_s1_cmi_q02_choice: string,
    e_s1_cmi_q02_remarks: string,
    e_s1_cmi_q03_choice: string,
    e_s1_cmi_q03_remarks: string,
    e_s1_cmi_q04_choice: string,
    e_s1_cmi_q04_remarks: string,
    e_s1_cmi_q05_choice: string,
    e_s1_cmi_q05_remarks: string,
    e_s1_cmi_q06_choice: string,
    e_s1_cmi_q06_remarks: string,
    e_s1_cmi_q07_choice: string,
    e_s1_cmi_q07_remarks: string,
    e_s1_cmi_q08_choice: string,
    e_s1_cmi_q08_remarks: string,
    e_s1_cmi_q09_choice: string,
    e_s1_cmi_q09_remarks: string,
    e_s1_cmi_q10_specify: string,
    e_s1_cmi_q11_specify: string,

    e_s2_a_q01_choice: string,
    e_s2_a_q01_remarks: string,

    e_s3_pr_q01_choice: string,
    e_s3_pr_q01_remarks: string,
    e_s3_pr_q02_choice: string,
    e_s3_pr_q02_remarks: string,
    e_s3_pr_q03_choice: string,
    e_s3_pr_q03_remarks: string,
    e_s3_pr_q04_choice: string,
    e_s3_pr_q04_remarks: string,

    ad1_name: string,
    ad1_nricOrFinNo: string,
    ad1_role: string,
    ad1_contactNo: string,

    ad2_name: string,
    ad2_nricOrFinNo: string,
    ad2_role: string,
    ad2_contactNo: string,

    ad3_name: string,
    ad3_nricOrFinNo: string,
    ad3_role: string,
    ad3_contactNo: string,

    ad4_name: string,
    ad4_nricOrFinNo: string,
    ad4_role: string,
    ad4_contactNo: string,

    ad5_name: string,
    ad5_nricOrFinNo: string,
    ad5_role: string,
    ad5_contactNo: string,

    ad6_name: string,
    ad6_nricOrFinNo: string,
    ad6_role: string,
    ad6_contactNo: string,

    ad_name: string,
    ad_nricOrFinNo: string,
    ad_orgType: string,
    ad_orgName: string,
    ad_depName: string,
    ad_contactNo: string,
    ad_email: string,

    ptwStatus_permitStatus: string,
    ptwStatus_taskStatus: string,
    ptwStatus_remarks: string,
    ptwStatus_checked: boolean,
    ptwStatus_supervisorName: string,
    ptwStatus_wantToTerminate: boolean,
    ptwStatus_reqTermTimestamp: string,
    ptwStatus_termTimestamp: string,
    ptwStatus_timestamp: string,

    saEval_passed: boolean,
    saEval_name: string,
    saEval_timestamp: string,

    amApproval_passed: boolean,
    amApproval_name: string,
    amApproval_timestamp: string,

    reqStatus: string,
    wantToCanc: boolean,
    reqCancTimestamp: string,
    cancTimestamp: string,
    timestamp: string
  ): void {
    const headers = { 
      'content-type': 'application/json' 
    };

    this.http.put(this.ptwUrl + "/" + id, 
      {
        ptwId: ptwId,
        ptwYear: ptwYear,
        locationOfWork: {
          main: selectedLocationOfWork,
          sub: selectedLocationSector
        },
        permitType: permitType,
        startWorkingDateTime: startWorkingDateTime,
        endWorkingDateTime: endWorkingDateTime,
        //taskDescription: taskDescription,
        predefinedTask: predefinedTask,
        predefinedTaskOthers: predefinedTaskOthers,
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
        hotWork: {
          sectionOne: {
            controlMeasuresImplemented: {
              q01: {
                choice: hw_s1_cmi_q01_choice,
                remarks: hw_s1_cmi_q01_remarks
              },
              q02: {
                choice: hw_s1_cmi_q02_choice,
                remarks: hw_s1_cmi_q02_remarks
              },
              q03: {
                choice: hw_s1_cmi_q03_choice,
                remarks: hw_s1_cmi_q03_remarks
              },
              q04: {
                choice: hw_s1_cmi_q04_choice,
                remarks: hw_s1_cmi_q04_remarks
              },
              q05: {
                choice: hw_s1_cmi_q05_choice,
                remarks: hw_s1_cmi_q05_remarks
              },
              q06: {
                choice: hw_s1_cmi_q06_choice,
                remarks: hw_s1_cmi_q06_remarks
              },
              q07: {
                choice: hw_s1_cmi_q07_choice,
                remarks: hw_s1_cmi_q07_remarks
              },
              q08: {
                choice: hw_s1_cmi_q08_choice,
                remarks: hw_s1_cmi_q08_remarks
              },
              q09: {
                choice: hw_s1_cmi_q09_choice,
                remarks: hw_s1_cmi_q09_remarks
              },
              q10: {
                choice: hw_s1_cmi_q10_choice,
                remarks: hw_s1_cmi_q10_remarks
              },
              q11: {
                choice: hw_s1_cmi_q11_choice,
                remarks: hw_s1_cmi_q11_remarks
              },
              q12: {
                specify: hw_s1_cmi_q12_specify
              },
              q13: {
                specify: hw_s1_cmi_q13_specify
              }
            }
          },
          sectionTwo: {
            assessment: {
              q01: {
                choice: hw_s2_a_q01_choice,
                remarks: hw_s2_a_q01_remarks
              }
            }
          },
          sectionThree: {
            permitReview: {
              q01: {
                choice: hw_s3_pr_q01_choice,
                remarks: hw_s3_pr_q01_remarks
              },
              q02: {
                choice: hw_s3_pr_q02_choice,
                remarks: hw_s3_pr_q02_remarks
              },
              q03: {
                choice: hw_s3_pr_q03_choice,
                remarks: hw_s3_pr_q03_remarks
              },
              q04: {
                choice: hw_s3_pr_q04_choice,
                remarks: hw_s3_pr_q04_remarks
              }
            }
          }
        },
        coldWork: {
          sectionOne: {
            controlMeasuresImplemented: {
              q01: {
                choice: cw_s1_cmi_q01_choice,
                remarks: cw_s1_cmi_q01_remarks
              },
              q02: {
                choice: cw_s1_cmi_q02_choice,
                remarks: cw_s1_cmi_q02_remarks
              },
              q03: {
                choice: cw_s1_cmi_q03_choice,
                remarks: cw_s1_cmi_q03_remarks
              },
              q04: {
                choice: cw_s1_cmi_q04_choice,
                remarks: cw_s1_cmi_q04_remarks
              },
              q05: {
                choice: cw_s1_cmi_q05_choice,
                remarks: cw_s1_cmi_q05_remarks
              },
              q06: {
                choice: cw_s1_cmi_q06_choice,
                remarks: cw_s1_cmi_q06_remarks
              },
              q07: {
                choice: cw_s1_cmi_q07_choice,
                remarks: cw_s1_cmi_q07_remarks
              },
              q08: {
                choice: cw_s1_cmi_q08_choice,
                remarks: cw_s1_cmi_q08_remarks
              },
              q09: {
                choice: cw_s1_cmi_q09_choice,
                remarks: cw_s1_cmi_q09_remarks
              },
              q10: {
                specify: cw_s1_cmi_q10_specify
              },
              q11: {
                specify: cw_s1_cmi_q11_specify
              }
            }
          },
          sectionTwo: {
            assessment: {
              q01: {
                choice: cw_s2_a_q01_choice,
                remarks: cw_s2_a_q01_remarks
              }
            }
          },
          sectionThree: {
            permitReview: {
              q01: {
                choice: cw_s3_pr_q01_choice,
                remarks: cw_s3_pr_q01_remarks
              },
              q02: {
                choice: cw_s3_pr_q02_choice,
                remarks: cw_s3_pr_q02_remarks
              },
              q03: {
                choice: cw_s3_pr_q03_choice,
                remarks: cw_s3_pr_q03_remarks
              },
              q04: {
                choice: cw_s3_pr_q04_choice,
                remarks: cw_s3_pr_q04_remarks
              }
            }
          }
        },
        electrical: {
          sectionOne: {
            controlMeasuresImplemented: {
              q01: {
                choice: e_s1_cmi_q01_choice,
                remarks: e_s1_cmi_q01_remarks
              },
              q02: {
                choice: e_s1_cmi_q02_choice,
                remarks: e_s1_cmi_q02_remarks
              },
              q03: {
                choice: e_s1_cmi_q03_choice,
                remarks: e_s1_cmi_q03_remarks
              },
              q04: {
                choice: e_s1_cmi_q04_choice,
                remarks: e_s1_cmi_q04_remarks
              },
              q05: {
                choice: e_s1_cmi_q05_choice,
                remarks: e_s1_cmi_q05_remarks
              },
              q06: {
                choice: e_s1_cmi_q06_choice,
                remarks: e_s1_cmi_q06_remarks
              },
              q07: {
                choice: e_s1_cmi_q07_choice,
                remarks: e_s1_cmi_q07_remarks
              },
              q08: {
                choice: e_s1_cmi_q08_choice,
                remarks: e_s1_cmi_q08_remarks
              },
              q09: {
                choice: e_s1_cmi_q09_choice,
                remarks: e_s1_cmi_q09_remarks
              },
              q10: {
                specify: e_s1_cmi_q10_specify
              },
              q11: {
                specify: e_s1_cmi_q11_specify
              }
            }
          },
          sectionTwo: {
            assessment: {
              q01: {
                choice: e_s2_a_q01_choice,
                remarks: e_s2_a_q01_remarks
              }
            }
          },
          sectionThree: {
            permitReview: {
              q01: {
                choice: e_s3_pr_q01_choice,
                remarks: e_s3_pr_q01_remarks
              },
              q02: {
                choice: e_s3_pr_q02_choice,
                remarks: e_s3_pr_q02_remarks
              },
              q03: {
                choice: e_s3_pr_q03_choice,
                remarks: e_s3_pr_q03_remarks
              },
              q04: {
                choice: e_s3_pr_q04_choice,
                remarks: e_s3_pr_q04_remarks
              }
            }
          }
        },
        attendantDets: [
          {
            id: 1,
            name: ad1_name,
            nricOrFinNo: ad1_nricOrFinNo,
            role: ad1_role,
            contactNo: ad1_contactNo
          },
          {
            id: 2,
            name: ad2_name,
            nricOrFinNo: ad2_nricOrFinNo,
            role: ad2_role,
            contactNo: ad2_contactNo
          },
          {
            id: 3,
            name: ad3_name,
            nricOrFinNo: ad3_nricOrFinNo,
            role: ad3_role,
            contactNo: ad3_contactNo
          },
          {
            id: 4,
            name: ad4_name,
            nricOrFinNo: ad4_nricOrFinNo,
            role: ad4_role,
            contactNo: ad4_contactNo
          },
          {
            id: 5,
            name: ad5_name,
            nricOrFinNo: ad5_nricOrFinNo,
            role: ad5_role,
            contactNo: ad5_contactNo
          },
          {
            id: 6,
            name: ad6_name,
            nricOrFinNo: ad6_nricOrFinNo,
            role: ad6_role,
            contactNo: ad6_contactNo
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
        ptwStatus: {
          permitStatus: ptwStatus_permitStatus,
          taskStatus: ptwStatus_taskStatus,
          remarks: ptwStatus_remarks,
          checked: ptwStatus_checked,
          supervisorName: ptwStatus_supervisorName,
          wantToTerminate: ptwStatus_wantToTerminate,
          reqTermTimestamp: ptwStatus_reqTermTimestamp,
          terminatedTimestamp: ptwStatus_termTimestamp,
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
        requestStatus: reqStatus,
        wantToCancel: wantToCanc,
        reqCancTimestamp: reqCancTimestamp,
        cancelledTimestamp: cancTimestamp,
        timestamp: timestamp
      }, { "headers": headers }).subscribe(resp => {
        console.log(resp);
    });
  }

  public openSnackBar(msg: string, action: string): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}