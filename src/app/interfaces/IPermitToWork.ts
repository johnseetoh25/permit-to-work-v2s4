export interface IPermitToWork {
	id: number,
	ptwId: string,
	ptwYear: string,
    locationOfWork: {
		main: string,
		sub: string
	},
	permitType: string,
    startWorkingDateTime: string,
    endWorkingDateTime: string,
    //taskDescription: string,
	predefinedTask: string,
	predefinedTaskOthers: string,
	noOfWorkers: number,
	noOfSupervisors: number,
	workAtHeight: {
		sectionOne: {
			controlMeasuresImplemented: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				},
				q05: {
					choice: string,
					remarks: string
				},
				q06: {
					choice: string,
					remarks: string
				},
				q07: {
					choice: string,
					remarks: string
				},
				q08: {
					choice: string,
					remarks: string
				},
				q09: {
					choice: string,
					remarks: string
				},
				q10: {
					choice: string,
					remarks: string
				},
				q11: {
					specify: string
				}
			}
		},
		sectionTwo: {
			assessmentOfControlMeasures: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				}
			},
			siteSurveyFromSupervisor: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				}
			},
			multiLocOrExtentedDuration: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				}
			}
		},
		sectionThree: {
			permitReview: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string, 
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				}
			}
		}
	},
	confinedSpace: {
		sectionOne: {
			potentialHazards: {
				atmo: string,
				nonAtmo: string
			},
			controlMeasuresImplemented: {
				preEntryReqs: {
					q01: string,
					q02: string,
					q03: string,
					q04: string,
					q05: string,
					q06: string,
					q07: string,
					q08: string
				},
				ppe: {
					q01: string,
					q02: string,
					q03: string,
					q04: string,
					q05: string,
					q06: string,
					q07: {
						specify: string
					}
				}
			}
		},
		sectionTwo: {
			gasMonitoringRes: {
				oxygenLevel: number,
				flammableGasLevel: number,
				toxicGasLevel: number,
				fitForEntry: boolean,
			}
		},
		sectionThree: {
			permitReview: {
				q01: string,
				q02: string,
				q03: string,
				q04: string
			}
		}
	},
	hotWork: {
		sectionOne: {
			controlMeasuresImplemented: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				},
				q05: {
					choice: string,
					remarks: string
				},
				q06: {
					choice: string,
					remarks: string
				},
				q07: {
					choice: string,
					remarks: string
				},
				q08: {
					choice: string,
					remarks: string
				},
				q09: {
					choice: string,
					remarks: string
				},
				q10: {
					choice: string,
					remarks: string
				},
				q11: {
					choice: string,
					remarks: string
				},
				q12: {
					specify: string
				},
				q13: {
					specify: string
				}
			}
		},
		sectionTwo: {
			assessment: {
				q01: {
					choice: string,
					remarks: string
				}
			}
		},
		sectionThree: {
			permitReview: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				}
			}
		}
	},
	coldWork: {
		sectionOne: {
			controlMeasuresImplemented: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				},
				q05: {
					choice: string,
					remarks: string
				},
				q06: {
					choice: string,
					remarks: string
				},
				q07: {
					choice: string,
					remarks: string
				},
				q08: {
					choice: string,
					remarks: string
				},
				q09: {
					choice: string,
					remarks: string
				},
				q10: {
					specify: string
				},
				q11: {
					specify: string
				}
			}
		},
		sectionTwo: {
			assessment: {
				q01: {
					choice: string,
					remarks: string
				}
			}
		},
		sectionThree: {
			permitReview: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				}
			}
		}
	},
	electrical: {
		sectionOne: {
			controlMeasuresImplemented: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
				q04: {
					choice: string,
					remarks: string
				},
				q05: {
					choice: string,
					remarks: string
				},
				q06: {
					choice: string,
					remarks: string
				},
				q07: {
					choice: string,
					remarks: string
				},
				q08: {
					choice: string,
					remarks: string
				},
				q09: {
					choice: string,
					remarks: string
				},
				q10: {
					specify: string
				},
				q11: {
					specify: string
				}
			}
		},
		sectionTwo: {
			assessment: {
				q01: {
					choice: string,
					remarks: string
				}
			}
		},
		sectionThree: {
			permitReview: {
				q01: {
					choice: string,
					remarks: string
				},
				q02: {
					choice: string,
					remarks: string
				},
				q03: {
					choice: string,
					remarks: string
				},
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
			nricOrFinNo: string,
			role: string,
			contactNo: string
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string,
			role: string,
			contactNo: string
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string,
			role: string,
			contactNo: string
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string,
			role: string,
			contactNo: string
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string,
			role: string,
			contactNo: string
		},
		{
			id: number,
			name: string,
			nricOrFinNo: string,
			role: string,
			contactNo: string
		},
	],
	applicantDets: {
		name: string,
		nricOrFinNo: string,
		orgType: string,
		orgName: string,
		depName: string,
		contactNo: string,
		email: string
	},
	ptwStatus: {
		permitStatus: string,
		taskStatus: string,
		remarks: string,
		checked: boolean,
		supervisorName: string,
		wantToTerminate: boolean,
		reqTermTimestamp: string,
		terminatedTimestamp: string,
		timestamp: string
	},
	safetyAssessorEvaluation: {
		passed: boolean,
		name: string,
		timestamp: string
	},
	authorisedManagerApproval: {
		passed: boolean,
		name: string,
		timestamp: string
	},
	requestStatus: string,
	wantToCancel: boolean,
	reqCancTimestamp: string,
	cancelledTimestamp: string,
	timestamp: string
}