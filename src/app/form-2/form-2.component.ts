import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataDTO, FormDataResourceService } from 'aig-generic';
import { ComplexApiControllerService, ComplexSolidarityRequestDTO, ComplexSolidarityRequestDTOFamily } from 'aig-solidarety';

@Component({
    selector: 'form-2',
    templateUrl: './form-2.component.html',
    styleUrls: ['./form-2.component.scss']
})
export class Form2Component implements OnInit {
    inTrasmission: boolean = false;

    trasmissionStatus = 0;
    trasmissionError;
    showTrasmissionError = false;

    isLinear = true;
    principalRequirementIsCompleted = false;
    fiscalFormIsCompleted = false;

    principalRequirementFormGroup: FormGroup;
    anagraficFormGroup: FormGroup;
    residenceFormGroup: FormGroup;
    economicSituationFormGroup: FormGroup;
    fiscalDataValueFormGroup: FormGroup;

    confirmationId;

    constructor(
        private _formBuilder: FormBuilder,
        private complexApiControllerService: ComplexApiControllerService,
		
        //private complexApiControllerService: ComplexApiControllerService,
		private formDataResourceService: FormDataResourceService,
    ) { }

	b:any;

    ngOnInit(): void {
        this.principalRequirementFormGroup = this._formBuilder.group({
            accountBalance: ['', Validators.required],
            /* reason: ['', Validators.required],*/
        });

        this.anagraficFormGroup = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(17)]],

            email: ['', [Validators.email]],
            mobile: ['', [Validators.required, Validators.minLength(9)]],

            adult: ['', Validators.required],
            children: [''],
        });

        this.residenceFormGroup = this._formBuilder.group({
            address: ['', Validators.required],
            address2: ['', Validators.required],
            rentOrMutal: ['', Validators.required],
        });

        this.economicSituationFormGroup = this._formBuilder.group({
            economicalSituation: ['', Validators.required],
        });

        this.fiscalDataValueFormGroup = this._formBuilder.group({
            incomeConfirmationControl: ['', Validators.required],
            octoberIncome: ['', [Validators.required, Validators.max(1000)]],
        });


    }

    principalRequirementError1;
    /* principalRequirementError2; */
    checkPrincipalRequirement($event): void {
        let check1: boolean = true;
        /* let check2: boolean = true; */

        let accountBalanceValue = this.principalRequirementFormGroup.controls.accountBalance.value;
        this.principalRequirementIsCompleted = false;

        if ($event != null) {
            accountBalanceValue = $event.value;
        }

       /* if(this.principalRequirementFormGroup.controls.reason.status == "INVALID") {
            check1 = false;
            this.principalRequirementError2 = "Selezionare motivo della richiesta!";
        } */
        switch (accountBalanceValue) {
            case 'A': case 'B': break;
            case 'C':
                this.principalRequirementError1 = "NON E' POSSIBILE PRESENTARE L'ISTANZA";
                check1 = false;
                break;
            default:
                this.principalRequirementError1 = "Selezionare fascia!";
                check1 = false;
                break;
        }

        if(check1 /* && check2 */) {
            this.principalRequirementIsCompleted = true;
            this.principalRequirementError1 = "";
            /* this.principalRequirementError2 = ""; */
        }
    }
    checkAndGoPrincipalRequirement(stepper): void {
        this.checkPrincipalRequirement(null);

        if (this.principalRequirementIsCompleted) {
            setTimeout(() => stepper.next(), 1);
        }
    }







    checkFiscalDataValue(stepper): void {
        let economicalSituation = this.economicSituationFormGroup.controls.economicalSituation.value;
        this.fiscalFormIsCompleted = false;

        switch (economicalSituation) {
            case 'A':
                if (this.fiscalDataValueFormGroup.controls.incomeConfirmationControl.invalid) {
                    break;
                }
                if (this.fiscalDataValueFormGroup.controls.incomeConfirmationControl.value == 0) {
                    break;
                }
                this.fiscalFormIsCompleted = true;
                break;
            case 'B': case 'D':
                if (this.fiscalDataValueFormGroup.controls.octoberIncome.invalid) {
                    break;
                }
                this.fiscalFormIsCompleted = true;
                break;
            case 'C': case 'E':
                if (this.fiscalDataValueFormGroup.controls.octoberIncome.invalid) {
                    break;
                }
                this.fiscalFormIsCompleted = true;
                break;
            case 'F':
                if (this.fiscalDataValueFormGroup.controls.prevYearIncome.invalid || this.fiscalDataValueFormGroup.controls.octoberIncome.invalid) {
                    break;
                }
                this.fiscalFormIsCompleted = true;
                break;
        }

        setTimeout(() => stepper.next(), 1);
    }

	
    async confirmation() {
        this.inTrasmission = true;
        this.trasmissionStatus = 0;
        this.showTrasmissionError = false;

		console.log (this.anagraficFormGroup)
		this.b = {
			firstname: this.anagraficFormGroup.value.firstname,
			lastname: this.anagraficFormGroup.value.lastname,
			taxId: this.anagraficFormGroup.value.taxId,
			email: this.anagraficFormGroup.value.email,
			mobile: this.anagraficFormGroup.value.mobile,
			adult: this.anagraficFormGroup.value.adult,
			children: this.anagraficFormGroup.value.children,
			address: this.residenceFormGroup.value.address,
			address2: this.residenceFormGroup.value.address2,
			rentOrMutal: this.residenceFormGroup.value.rentOrMutal,
			economicalSituation: this.economicSituationFormGroup.value.economicalSituation,
			accountBalance: this.principalRequirementFormGroup.value.accountBalance,
			
		}
	
    	
       
		
        let request: FormDataDTO = {
			formTypeId: 1,

			s1: this.principalRequirementFormGroup.value.accountBalance,


			s2: this.anagraficFormGroup.value.firstname,
			s3: this.anagraficFormGroup.value.lastname,
			s4: this.anagraficFormGroup.value.taxId,
			s5: this.anagraficFormGroup.value.email,
			s6: this.anagraficFormGroup.value.mobile,
			n1: this.anagraficFormGroup.value.adult,
			n2: (this.anagraficFormGroup.value.children == "") ? 0 : this.anagraficFormGroup.value.children,

			s7: this.residenceFormGroup.value.address,
            s8: this.residenceFormGroup.value.address2,
			s9: this.residenceFormGroup.value.rentOrMutal,

			s10: this.economicSituationFormGroup.value.economicalSituation,

			n3: (this.economicSituationFormGroup.value.economicalSituation == "A") ? null : this.fiscalDataValueFormGroup.value.octoberIncome
        }

        try {
            let response = await this.formDataResourceService.createFormDataUsingPOST(request).toPromise();
            this.confirmationId = response.id;
            this.trasmissionStatus = 1;
        } catch (e) {
            this.trasmissionStatus = 2;
            this.trasmissionError = e;
        }
    }

	
	
}
