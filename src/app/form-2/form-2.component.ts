import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    ) { }

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
            rentOrMutal: [''],
        });

        this.economicSituationFormGroup = this._formBuilder.group({
            economicalSituation: ['', Validators.required],
        });

        this.fiscalDataValueFormGroup = this._formBuilder.group({
            incomeConfirmationControl: ['', Validators.required],
            octoberIncome: ['', Validators.required],
            incomeReason: ['', Validators.required],
            prevYearIncome: ['', Validators.required],
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
                if (this.fiscalDataValueFormGroup.controls.octoberIncome.invalid || this.fiscalDataValueFormGroup.controls.incomeReason.invalid) {
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

        let request: ComplexSolidarityRequestDTO = {
            telephone: this.principalRequirementFormGroup.controls.accountBalance.value,//conto
            firstname: this.anagraficFormGroup.controls.firstname.value,
            lastname: this.anagraficFormGroup.controls.lastname.value,
            taxId: this.anagraficFormGroup.controls.taxId.value,
            email: this.anagraficFormGroup.controls.email.value,
            mobile: this.anagraficFormGroup.controls.mobile.value,
            family: {
                adult: this.anagraficFormGroup.controls.adult.value,
                children: (this.anagraficFormGroup.controls.children.value == "") ? 0 : this.anagraficFormGroup.controls.children.value,
            },
            address: this.residenceFormGroup.controls.address.value,
            address2: this.residenceFormGroup.controls.address2.value,
            requestStatusA: (this.residenceFormGroup.controls.rentOrMutal.value == 'A') ? true : false, //fitto o mutuo
            requestStatusB: (this.residenceFormGroup.controls.rentOrMutal.value == 'B') ? true : false, //fitto o mutuo
            
            cap: this.principalRequirementFormGroup.controls.reason.value, //fascia
            
            requestStatusBIncomeMar: this.fiscalDataValueFormGroup.controls.octoberIncome.value,//reddito ottobre
            city: this.fiscalDataValueFormGroup.controls.incomeReason.value,//motivo reddito
            requestStatusBIncomeFeb: this.fiscalDataValueFormGroup.controls.prevYearIncome.value//reddito anno prec
        }
        
        try {
            let response = await this.complexApiControllerService.complexSolidarityRequestPost(request).toPromise();
            this.confirmationId = response.id;
            this.trasmissionStatus = 1;
        } catch (e) {
            this.trasmissionStatus = 2;
            this.trasmissionError = e;
        }
    }
}
