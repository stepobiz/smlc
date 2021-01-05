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
            accountBalance: ['', Validators.required]
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
            octoberIncome: ['', Validators.required],
            incomeReason: ['', Validators.required],
            prevYearIncome: ['', Validators.required],
        });


    }

    principalRequirementError;
    checkPrincipalRequirement($event): void {
        let accountBalanceValue = this.principalRequirementFormGroup.controls.accountBalance.value;
        this.principalRequirementIsCompleted = false;

        if ($event != null) {
            accountBalanceValue = $event.value;
        }

        switch (accountBalanceValue) {
            case 'A': case 'B':
                this.principalRequirementIsCompleted = true;
                this.principalRequirementError = "";
                break;
            case 'C':
                this.principalRequirementError = "NON E' POSSIBILE PRESENTARE L'ISTANZA";
                break;
            default:
                this.principalRequirementError = "Selezionare fascia!";
                break;
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
            requestStatusA: (this.residenceFormGroup.controls.rentOrMutal.value == '1') ? true : false, //fitto o mutuo
            cap: this.economicSituationFormGroup.controls.economicalSituation.value, //fascia
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
