import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'form-2',
    templateUrl: './form-2.component.html',
    styleUrls: ['./form-2.component.scss']
})
export class Form2Component implements OnInit {
    isLinear = true;
    principalRequirementIsCompleted = false;
    fiscalFormIsCompleted = false;

    principalRequirementFormGroup: FormGroup;
    anagraficFormGroup: FormGroup;
    residenceFormGroup: FormGroup;
    economicSituationFormGroup: FormGroup;
    fiscalDataValueFormGroup: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
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

        if($event != null) {
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
                    console.log("compila il campo");
                    break;
                }
                if (this.fiscalDataValueFormGroup.controls.incomeConfirmationControl.value == 0) {
                    console.log("Non va bene");
                    break;
                }
                console.log("OK:", this.fiscalDataValueFormGroup.controls.incomeConfirmationControl.value);
                this.fiscalFormIsCompleted = true;
                break;
            case 'B': case 'D':
                if (this.fiscalDataValueFormGroup.controls.octoberIncome.invalid || this.fiscalDataValueFormGroup.controls.incomeReason.invalid) {
                    console.log("compila il campo");
                    break;
                }
                console.log(this.fiscalDataValueFormGroup.controls.octoberIncome.value);
                console.log(this.fiscalDataValueFormGroup.controls.incomeReason.value);
                this.fiscalFormIsCompleted = true;
                break;
            case 'C': case 'E':
                if (this.fiscalDataValueFormGroup.controls.octoberIncome.invalid) {
                    console.log("compila il campo");
                    break;
                }
                console.log(this.fiscalDataValueFormGroup.controls.octoberIncome.value);
                this.fiscalFormIsCompleted = true;
                break;
            case 'F':
                if (this.fiscalDataValueFormGroup.controls.prevYearIncome.invalid || this.fiscalDataValueFormGroup.controls.octoberIncome.invalid) {
                    console.log("compila il campo");
                    break;
                }
                console.log(this.fiscalDataValueFormGroup.controls.prevYearIncome.value);
                console.log(this.fiscalDataValueFormGroup.controls.octoberIncome.value);
                this.fiscalFormIsCompleted = true;
                break;
            default:
                this.principalRequirementError = "Selezionare la condizione economica!";
                break;
        }

        setTimeout(() => stepper.next(), 1);
    }


    confirmation(stepper): void {

    }
}
