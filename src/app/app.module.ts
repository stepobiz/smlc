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

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,

    AigSolidaretyApiModule,
    HttpClientModule,

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenContextInterceptor,
      multi: true
    },
    {
      provide: AIG_SOLIDARETY_BASE_PATH,
      useValue: "https://api-gest.stage.eneasys.net/" + "solidarety"
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
