export interface IPermitToWork {
	// COMMON SECTION: To be completed by SUPERVISOR
	id: number, // JSON auto-ID
	ptwId: string, // Incremented
    locationOfWork: {
		/*
			4 mains:
			- Biodiesel production sector
				3 subs:
					- Biodiesel production
					- Biodiesel purification
					- Ethanol recovery
			- Waste water treatment sector
				3 subs:
					- Primary treatment
					- Secondary treatment
					- Ternary treatment
			- Work at height training platform
			- Confined space training room
		*/
		main: string,
		sub: string
	},
	/*
		4 mains:
		- Hot work (HW)
		- Cold work (CW)
		- Electrical (E)
		- Work at height (WAH)
		- Confined space (CS)
	*/
	permitType: string,
    startWorkingDateTime: string,
    endWorkingDateTime: string,
    taskDescription: string,
	noOfWorkers: number,
	noOfSupervisors: number,
	workAtHeight: {
		// SECTION I: To be completed by SUPERVISOR
		sectionOne: {
			controlMeasuresImplemented: {
				// Q1: Due consideration given to eliminate work at heights tasks.
				q01: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q2: Safe means of access or egress provided.
				q02: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q3: Edge protection provided wherever there is falling risks.
				q03: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q4: Fall prevention equipment used to provide access or work platform.
				q04: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q5: Fall prevention equipment are adequate and in good condition.
				q05: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q6: Anchorage/ lifeline installed and inspected by competent person.
				q06: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q7: Travel restraint system used to exclude persons from falling risks.
				q07: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q8: All persons subjected to falling risks are equipped with Personal Fall Arrest System (PFAS).
				q08: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q9: All personnel are adequately trained to perform work at heights.
				q09: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q10: Hazards and risk assessment are conducted and communicated.
				q10: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q11: Others (please specify).
				q11: {
					specify: string
				}
			}
		},
		// SECTION II: To be completed by SAFETY ASSESSOR
		sectionTwo: {
			assessmentOfControlMeasures: {
				// Q1: All reasonably practicable measures have been taken.
				q01: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q2: Verification of documents/ interview workers/ others.
				q02: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				}
			},
			siteSurveyFromSupervisor: {
				// Q1: All persons on site are protected from falling risks.
				q01: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q2: Surrounding areas do not pose additional hazards.
				q02: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				}
			},
			multiLocOrExtentedDuration: {
				// Q1: Hazards are common at various locations/ time period.
				q01: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q2: Control measures are applicable and effective.
				q02: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				}
			}
		},
		// SECTION III: To be completed by AUTHORISED MANAGER
		sectionThree: {
			permitReview: {
				// Q1: Proper permit-to-work evaluation has been completed.
				q01: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q2: No incompatible works that may pose additional hazards.
				q02: {
					choice: string, 
					remarks: string
				},
				// Q3: Control measures have been implemented effectively.
				q03: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				},
				// Q4: Fall from heights risks have been effectively mitigated.
				q04: {
					choice: string, // 3 values: | YES | NO | N/A |
					remarks: string
				}
			}
		}
	},
	confinedSpace: {
		// SECTION A: To be completed by SUPERVISOR
		sectionOne: {
			potentialHazards: {
				atmo: string,
				nonAtmo: string
			},
			controlMeasuresImplemented: {
				preEntryReqs: {
					// Q1: Ventilation
					q01: string,
					// Q2: Lighting
					q02: string,
					// Q3: Barricades and signboards
					q03: string,
					// Q4: De-energisation / lockout-tag out (LOTO)
					q04: string,
					// Q5: Blanking / bleeding of pipes
					q05: string,
					// Q6: Personal gas detector
					q06: string,
					// Q7: Torchlight
					q07: string,
					// Q8: Flame-proof light
					q08: string
				},
				ppe: {
					// Q1: Safety helmet
					q01: string,
					// Q2: Eye protection
					q02: string,
					// Q3: Hand protection
					q03: string,
					// Q4: Safety harness / lifelines
					q04: string,
					// Q5: Respiratory protection
					q05: string,
					// Q6: Name / identification badge
					q06: string,
					// Q7: Other PPE
					q07: {
						specify: string
					}
				}
			}
		},
		// SECTION II: To be completed by SAFETY ASSESSOR
		sectionTwo: {
			gasMonitoringRes: {
				oxygenLevel: number, // 19.5% - 23.5%
				flammableGasLevel: number, // Less than 10% LEL
				toxicGasLevel: number, // ppm
				fitForEntry: boolean, // Satisfied by gasMonitoringRes
			}
		},
		// SECTION III: To be completed by AUTHORISED MANAGER
		sectionThree: {
			permitReview: {
				// Q1: The levels of oxygen, flammable gas and toxic substances are within the permissible range. (Refer to SECTION II)
				q01: string,
				// Q2: The confined space is adequately	ventilated.
				q02: string,
				// Q3: Effective steps have been taken to prevent any ingress of dangerous gases, vapours or any other dangerous substances into the confined space.
				q03: string,
				// Q4: All reasonably practicable measures have been taken to ensure the safety and health of persons who will be entering or working in the confined space.
				q04: string
			}
		}
	},
	hotWork: {
		// SECTION I: To be completed by SUPERVISOR
		sectionOne: {
			controlMeasuresImplemented: {
				// Q1: A risk assessment has been completed.
				q01: {
					choice: string,
					remarks: string
				},
				// Q2: The worker(s) are trained and competent to conduct hot work.
				q02: {
					choice: string,
					remarks: string
				},
				// Q3: Combustible materials have been removed from the area of hot work.
				q03: {
					choice: string,
					remarks: string
				},
				// Q4: Fire resistance sheeting has been used to protect the area of hot work.
				q04: {
					choice: string,
					remarks: string
				},
				// Q5: The potential of the presence of flammable vapor has been checked and LEL is < 3%.
				q05: {
					choice: string,
					remarks: string
				},
				// Q6: Hot work equipment (e.g.: welding kit) has been inspected and is in a good condition.
				q06: {
					choice: string,
					remarks: string
				},
				// Q7: A second man or fire watch is in place for the hot work.
				q07: {
					choice: string,
					remarks: string
				},
				// Q8: Hot work workers are equipped with appropriate PPE (e.g.: welding mask, protective gloves etc.).
				q08: {
					choice: string,
					remarks: string
				},
				// Q9: Ventilation to remove hazardous welding fumes is in place.
				q09: {
					choice: string,
					remarks: string
				},
				// Q10: Fire extinguisher is in place near hot work.
				q10: {
					choice: string,
					remarks: string
				},
				// Q11: First aid kit is in place near hot work in the event of burns.
				q11: {
					choice: string,
					remarks: string
				},
				// Q12: Other precautions required to undertake the work safely (please specify, if any).
				q12: {
					specify: string
				},
				// Q13: Other safety equipment required to undertake the work safely (please specify, if any).
				q13: {
					specify: string
				}
			}
		},
		// SECTION II: To be completed by SAFETY ASSESSOR
		sectionTwo: {
			// Q1: All reasonably practicable measures have been taken.
			assessment: {
				q01: {
					choice: string,
					remarks: string
				}
			}
		},
		// SECTION III: To be completed by AUTHORISED MANAGER
		sectionThree: {
			permitReview: {
				// Q1: Proper permit-to-work evaluation has been completed.
				q01: {
					choice: string,
					remarks: string
				},
				// Q2: No incompatible works that may pose additional hazards.
				q02: {
					choice: string,
					remarks: string
				},
				// Q3: Control measures have been implemented effectively.
				q03: {
					choice: string,
					remarks: string
				},
				// Q4: Hot work risks have been effectively mitigated.
				q04: {
					choice: string,
					remarks: string
				}
			}
		}
	},
	coldWork: {
		// SECTION I: To be completed by SUPERVISOR
		sectionOne: {
			controlMeasuresImplemented: {
				// Q1: A risk assessment has been completed.
				q01: {
					choice: string,
					remarks: string
				},
				// Q2: The worker(s) are trained and competent to conduct the intended cold work.
				q02: {
					choice: string,
					remarks: string
				},
				// Q3: Work environment is checked (e.g.: good ventilation, adequate lighting, and dry floor etc.).
				q03: {
					choice: string,
					remarks: string
				},
				// Q4: Work equipment (e.g.: hand tool, power tool etc) has been inspected and is in a good condition.
				q04: {
					choice: string,
					remarks: string
				},
				// Q5: Electrical and / or mechanical isolation has been undertaken.
				q05: {
					choice: string,
					remarks: string
				},
				// Q6: No exposure to moving/ rotating machinery during cold work.
				q06: {
					choice: string,
					remarks: string
				},
				// Q7: A second man or standby is in place for the cold work.
				q07: {
					choice: string,
					remarks: string
				},
				// Q8: Workers are equipped with appropriate PPE (e.g.: safety helmet, protective gloves etc.).
				q08: {
					choice: string,
					remarks: string
				},
				// Q9: First aid kit is in place near working area.
				q09: {
					choice: string,
					remarks: string
				},
				// Q10: Other precautions required to undertake the work safely (please specify, if any).
				q10: {
					specify: string
				},
				// Q11: Other safety equipment required to undertake the work safely (please specify, if any).
				q11: {
					specify: string
				}
			}
		},
		// SECTION II: To be completed by SAFETY ASSESSOR
		sectionTwo: {
			// Q1: All reasonably practicable measures have been taken.
			assessment: {
				q01: {
					choice: string,
					remarks: string
				}
			}
		},
		// SECTION III: To be completed by AUTHORISED MANAGER
		sectionThree: {
			permitReview: {
				// Q1: Proper permit-to-work evaluation has been completed.
				q01: {
					choice: string,
					remarks: string
				},
				// Q2: No incompatible works that may pose additional hazards.
				q02: {
					choice: string,
					remarks: string
				},
				// Q3: Control measures have been implemented effectively.
				q03: {
					choice: string,
					remarks: string
				},
				// Q4: Cold work risks have been effectively mitigated.
				q04: {
					choice: string,
					remarks: string
				}
			}
		}
	},
	electrical: {
		// SECTION I: To be completed by SUPERVISOR
		sectionOne: {
			controlMeasuresImplemented: {
				// Q1: A risk assessment has been completed.
				q01: {
					choice: string,
					remarks: string
				},
				// Q2: The worker(s) are trained and competent to conduct electrical work.
				q02: {
					choice: string,
					remarks: string
				},
				// Q3: Electrical supply is turned off.
				q03: {
					choice: string,
					remarks: string
				},
				// Q4: "Test for Dead" on the isolated equipment has been conducted.
				q04: {
					choice: string,
					remarks: string
				},
				// Q5: Flammable/ combustible substances are removed from the area.
				q05: {
					choice: string,
					remarks: string
				},
				// Q6: Electrical work equipment (e.g.: multimeter) has been inspected and is in a good condition.
				q06: {
					choice: string,
					remarks: string
				},
				// Q7: Electrical work workers are equipped with appropriate PPE (e.g.: insulating gloves, safety boots etc.).
				q07: {
					choice: string,
					remarks: string
				},
				// Q8: A second man or standby person is in place during live electrical test work.
				q08: {
					choice: string,
					remarks: string
				},
				// Q9: First aid kit is in place near electrical work in the event of electrical shock.
				q09: {
					choice: string,
					remarks: string
				},
				// Q10: Other precautions required to undertake the work safely (please specify, if any).
				q10: {
					specify: string
				},
				// Q11: Other safety equipment required to undertake the work safely (please specify, if any).
				q11: {
					specify: string
				}
			}
		},
		// SECTION II: To be completed by SAFETY ASSESSOR
		sectionTwo: {
			assessment: {
				q01: {
					choice: string,
					remarks: string
				}
			}
		},
		// SECTION III: To be completed by AUTHORISED MANAGER
		sectionThree: {
			permitReview: {
				// Q1: Proper permit-to-work evaluation has been completed.
				q01: {
					choice: string,
					remarks: string
				},
				// Q2: No incompatible works that may pose additional hazards.
				q02: {
					choice: string,
					remarks: string
				},
				// Q3: Control measures have been implemented effectively.
				q03: {
					choice: string,
					remarks: string
				},
				// Q4: Electrical risks have been effectively mitigated.
				q04: {
					choice: string,
					remarks: string
				}
			}
		}
	},
	attendantDets: [
		{
			id: number,
			name: string,
			nricOrFinNo: string, // Format: | @xxxxxxx# |
			contactNo: string // Format: | +65 xxxx-xxxx |
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string, // Format: | @xxxxxxx# |
			contactNo: string // Format: | +65 xxxx-xxxx |
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string, // Format: | @xxxxxxx# |
			contactNo: string // Format: | +65 xxxx-xxxx |
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string, // Format: | @xxxxxxx# |
			contactNo: string // Format: | +65 xxxx-xxxx |
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string, // Format: | @xxxxxxx# |
			contactNo: string // Format: | +65 xxxx-xxxx |
		},
	],
	applicantDets: {
		name: string,
		nricOrFinNo: string, // Format: | @xxxxxxx# |
		orgType: string, // 2 types: | INTERNAL | EXTERNAL |
		orgName: string, // Required if orgType == "EXTERNAL"
		depName: string, // Required if orgType == "EXTERNAL"
		contactNo: string, // Format: | +65 xxxx-xxxx |
		email: string // For sending statement to the applicant
	},
	dailyEndorsement: { /* DailyEndorsement.ts */ },
	// To be completed by SUPERVISOR
	ptwStatus: {
		permitStatus: string, // 4 states: | YET IN EFFECT | VALID | TERMINATED | EXPIRED |
		taskStatus: string, // 3 states: | NOT STARTED | IN PROGESS | COMPLETED |
		remarks: string,
		checked: boolean, // Ensure that info is verified & approved
		supervisorName: string,
		timestamp: string // AUTO
	},
	// To be completed by SAFETY ASSESSOR
	safetyAssessorEvaluation: {
		passed: boolean, // Ensure that info is verified & approved
		name: string,
		timestamp: string // AUTO
	},
	// To be completed by AUTHORISED MANAGER
	authorisedManagerApproval: {
		passed: boolean, // Ensure that info is verified & approved
		name: string,
		timestamp: string // AUTO
	},
	checked: boolean, // Ensure that info is verified & approved
	requestStatus: string, // 3 states: | PENDING | APPROVED | REJECTED |
	statusRemarks: string, // If requestStatus == 'REJECTED', need to specify
	timestamp: string // AUTO
}