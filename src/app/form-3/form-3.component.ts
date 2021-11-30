import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplexApiControllerService, ComplexSolidarityRequestDTO, ComplexSolidarityRequestDTOFamily } from 'aig-solidarety';

@Component({
    selector: 'form-3',
    templateUrl: './form-3.component.html',
    styleUrls: ['./form-3.component.scss']
})
export class Form3Component implements OnInit {
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
            accountBalance: ['', [Validators.required, Validators.max(25000)]],
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
			amountRent: ['',Validators.required ],
			rentDate: ['', Validators.required ],
			ref: ['',Validators.required ],
			numberRef: ['',Validators.required ],
			iban: ['',Validators.required ],

        });

        this.fiscalDataValueFormGroup = this._formBuilder.group({
            octoberIncome: ['', Validators.required],
            incomeReason: ['', Validators.required],
            prevYearIncome: ['', Validators.required],
        });


    }





    checkFiscalDataValue(stepper): void {

		let rent: any ={
			amountRent : this.economicSituationFormGroup.controls.amountRent.value,
			rentDate : this.economicSituationFormGroup.controls.rentDate.value,
			ref : this.economicSituationFormGroup.controls.ref.value,
			numberRef : this.economicSituationFormGroup.controls.numberRef.value,
			iban : this.economicSituationFormGroup.controls.iban.value,
		}
		

        this.fiscalFormIsCompleted = false;

        

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
        
            
            cap: this.principalRequirementFormGroup.controls.reason.value, //fascia
            
          
            city: this.fiscalDataValueFormGroup.controls.incomeReason.value,//motivo reddito
            
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
