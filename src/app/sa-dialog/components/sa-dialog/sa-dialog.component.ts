import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPermitToWork } from 'src/app/interfaces/IPermitToWork';
import { DbService } from 'src/app/services/db.service';
import { TaskStatus } from 'src/app/constants/TaskStatus';
import { DefaultValues } from 'src/app/constants/DefaultValues';
import { PermitStatus } from 'src/app/constants/PermitStatus';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { ValidatorReqdetsComponent } from 'src/app/validator-reqdets/components/validator-reqdets/validator-reqdets.component';

@Component({
  selector: 'app-sa-dialog',
  templateUrl: './sa-dialog.component.html',
  styleUrls: ['./sa-dialog.component.scss']
})
export class SaDialogComponent implements OnInit {
  public ptwToAssess: IPermitToWork = <IPermitToWork>{};

  public radioButtonGroup: string[] = ['Yes', 'No', 'N/A'];

  // ============================ Section II for WAH ============================
  public wah_s2_acm_q01_choiceInput: string = "";
  public wah_s2_acm_q01_remarksInput: string = "";
  public wah_s2_acm_q02_choiceInput: string = "";
  public wah_s2_acm_q02_remarksInput: string = "";

  public wah_s2_ssfs_q01_choiceInput: string = "";
  public wah_s2_ssfs_q01_remarksInput: string = "";
  public wah_s2_ssfs_q02_choiceInput: string = "";
  public wah_s2_ssfs_q02_remarksInput: string = "";

  public wah_s2_mloed_q01_choiceInput: string = "";
  public wah_s2_mloed_q01_remarksInput: string = "";
  public wah_s2_mloed_q02_choiceInput: string = "";
  public wah_s2_mloed_q02_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for CS =============================
  public cs_s2_gmr_oxygenLevelInput: number = 0;
  public cs_s2_gmr_flammableGasLevelInput: number = 0;
  public cs_s2_gmr_toxicGasLevelInput: number = 0;
  public cs_s2_gmr_fitForEntryInput: boolean = false;
  // ============================================================================

  // ============================ Section II for HW =============================
  public hw_s2_a_q01_choiceInput: string = "";
  public hw_s2_a_q01_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for CW =============================
  public cw_s2_a_q01_choiceInput: string = "";
  public cw_s2_a_q01_remarksInput: string = "";
  // ============================================================================

  // ============================ Section II for E ==============================
  public e_s2_a_q01_choiceInput: string = "";
  public e_s2_a_q01_remarksInput: string = "";
  // ============================================================================

  constructor(
    @Inject(MAT_DIALOG_DATA) public targetPtw: any,
    private dialogRefSelf: MatDialogRef<SaDialogComponent>,
    private dialogRefVldReqDets: MatDialogRef<ValidatorReqdetsComponent>,
    private db: DbService,
    private msg: MessageService,
    private router: Router
  ) { }

  public ngOnInit(): void {

  }
}
