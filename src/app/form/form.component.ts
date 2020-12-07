import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplexApiControllerService } from 'aig-solidarety';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  step: any = {
    form: true,
    loading: false,
    complete: false
  };

  constructor(
    private complexApiControllerService: ComplexApiControllerService,
    private _formBuilder: FormBuilder,
  ) { }

  solidarityRequestNewForm: FormGroup;

  ngOnInit() {
    this.solidarityRequestNewForm = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      taxId: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(17)]],

      address: ['', Validators.required],
      address2: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      mobile: ['', [Validators.required, Validators.minLength(9)]],

      adult: ['', Validators.required],
      children: [''],

      requestStatus: ['', Validators.required],

      requestStatusBIncomeFeb: [''],
      requestStatusBIncomeMar: [''],
    })
  }

  async submit() {
    if (!this.solidarityRequestNewForm.valid) {
      return;
    }

    if (this.solidarityRequestNewForm.value.requestStatus == "B") {
      if (this.solidarityRequestNewForm.value.requestStatusBIncomeFeb == "" || this.solidarityRequestNewForm.value.requestStatusBIncomeMar == "") {
        alert("Inserisci i redditi di febbraio e marzo");
        return;
      }
    }

    if (this.solidarityRequestNewForm.value.requestStatus == "C") {
      if (this.solidarityRequestNewForm.value.requestStatusBIncomeMar == "") {
        alert("Inserisci il reddito di marzo");
        return;
      }
    }

    this.setStep("loading");

    switch (this.solidarityRequestNewForm.value.requestStatus) {
      case "A":
        this.solidarityRequestNewForm.value.requestStatusA = true;
        break;
      case "B":
        this.solidarityRequestNewForm.value.requestStatusB = true;
        break;
      case "C":
        this.solidarityRequestNewForm.value.requestStatusC = true;
        break;
      default:
        break;
    }

    this.solidarityRequestNewForm.value.city = "Santa Maria la Carità";
    this.solidarityRequestNewForm.value.cap = "80050";

    let family: any = {};
    family.adult = this.solidarityRequestNewForm.value.adult;
    if (this.solidarityRequestNewForm.value.children != "") {
      family.children = this.solidarityRequestNewForm.value.children;
    } else {
      family.children = 0;
    }


    this.solidarityRequestNewForm.value.family = family;

    try {
      await this.complexApiControllerService.complexSolidarityRequestPost(this.solidarityRequestNewForm.value).toPromise();
      this.setStep("complete");
    } catch (e) {
      alert("Errore nell'invio! Controllare che nei campi dei redditi non ci siano ne decimali ne il simbolo dell'euro");
      this.setStep("form");
    }

  }


  private setStep(step: string) {
    this.step.form = false;
    this.step.loading = false;
    this.step.complete = false;

    this.step[step] = true;
  }
}
