import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataDTO, FormDataResourceService } from 'aig-generic';
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

    confirmationId;

    constructor(
        private _formBuilder: FormBuilder,
        private formDataResourceService: FormDataResourceService,
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
        });

        this.economicSituationFormGroup = this._formBuilder.group({
			amountRent: ['', Validators.required],
			iban: [''],
			dateRent: ['', Validators.required],
			registrationDate: ['', Validators.required],
			referenceContract: ['', Validators.required],

        });


    }






    
	checkFiscalDataValue(stepper): void {
	
		this.fiscalFormIsCompleted = false;
	
		setTimeout(() => stepper.next(), 1);
		
    }

banana:any;
    async confirmation() {
        this.inTrasmission = true;
        this.trasmissionStatus = 0;
        this.showTrasmissionError = false;

		let request: FormDataDTO = {
			formTypeId: 2,

			n3: this.principalRequirementFormGroup.value.accountBalance,

			s2: this.anagraficFormGroup.value.firstname,
			s3: this.anagraficFormGroup.value.lastname,
			s4: this.anagraficFormGroup.value.taxId,
			s5: this.anagraficFormGroup.value.email,
			s6: this.anagraficFormGroup.value.mobile,
			n1: this.anagraficFormGroup.value.adult,
			n2: (this.anagraficFormGroup.value.children == "") ? 0 : this.anagraficFormGroup.value.children,

			s7: this.residenceFormGroup.value.address,
            s8: this.residenceFormGroup.value.address2,

			n5: this.economicSituationFormGroup.value.amountRent,
			s9: this.economicSituationFormGroup.value.iban,
			d2: this.economicSituationFormGroup.value.dateRent,
			d3: this.economicSituationFormGroup.value.registrationDate,
			s10: this.economicSituationFormGroup.value.referenceContract,

			d1: new Date(),
			
        }
		this.banana = request;
        
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
