import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CplxAlertModule, CplxAlertService } from 'projects/cplx-alert/src/public_api';
import { RouterModule, Routes } from '@angular/router';
import { CplxDatatableModule } from 'projects/cplx-datatable/src/public_api';
import { CplxAutocompleteModule } from 'projects/cplx-autocomplete/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
	path: '', component: AppComponent
}]

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		FormsModule,
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		CplxDatatableModule,
		CplxAlertModule.forRoot(),
		CplxAutocompleteModule
	],
	providers: [CplxAlertService],
	bootstrap: [AppComponent]
})

export class AppModule {

}
