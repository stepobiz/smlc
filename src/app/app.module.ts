import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AigSolidaretyApiModule, AIG_SOLIDARETY_BASE_PATH } from 'aig-solidarety';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenContextInterceptor } from './token-context.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Form2Component } from './form-2/form-2.component';
import { MatNativeDateModule, MatStepperModule, MAT_DATE_LOCALE } from '@angular/material';
import { Form3Component } from './form-3/form-3.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { AigGenericClientModule, AIG_GENERIC_PATH } from 'aig-generic';
import { Form4Component } from './form-4/form-4.component';

@NgModule({
  declarations: [
    AppComponent,
    Form2Component,
    FormComponent,
	Form3Component,
	Form4Component,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,

    HttpClientModule,
    AigSolidaretyApiModule,
	AigGenericClientModule,

    FormsModule,
    ReactiveFormsModule,
    
    FlexLayoutModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatStepperModule,
	MatDatepickerModule,
	MatNativeDateModule,

  ],
  providers: [
	  DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenContextInterceptor,
      multi: true
    },
	{
		provide: AIG_GENERIC_PATH,
		useValue: "https://api-gest.eneasys.net/" + "g5c"

	  },
	  { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
