import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IgxLayoutModule, IgxRippleModule, IgxNavigationDrawerModule, IgxNavbarModule, IgxButtonModule, IgxComboModule, IgxDatePickerModule, IgxIconModule, IgxInputGroupModule, IgxTimePickerModule, IgxSelectModule, IgxGridModule, IgxCheckboxModule, IgxCalendarModule, IgxDialogModule, IgxCardModule, IgxAutocompleteModule } from 'igniteui-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule, ExternalAuthService } from './authentication';
import { CustomerComponent } from './customer/customer.component';
import { CustomersViewComponent } from './customers-view/customers-view.component';
import { RegisterCarComponent, FilterByLetterPipe } from './register-car/register-car.component';
import { RegisteredCarsComponent } from './registered-cars/registered-cars.component';
import { WashPackagesComponent } from './wash-packages/wash-packages.component';
import { RegisterOrderComponent } from './register-order/register-order.component';
import { CustomerfilteringPipe } from './register-order/customerfiltering.pipe';
import { FirstnamelastnamePipe } from './register-order/firstnamelastname.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CustomerComponent,
        CustomersViewComponent,
        FilterByLetterPipe,
        RegisterCarComponent,
        RegisteredCarsComponent,
        WashPackagesComponent,
        RegisterOrderComponent,
        CustomerfilteringPipe,
        FirstnamelastnamePipe
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        // NOTE: `AuthenticationModule` defines child routes, must be imported before root `AppRoutingModule`
        AuthenticationModule,
        AppRoutingModule,
        IgxNavigationDrawerModule,
        IgxAutocompleteModule,
        IgxNavbarModule,
        IgxLayoutModule,
        IgxRippleModule,
        IgxButtonModule,
        IgxCardModule,
        IgxComboModule,
        IgxDatePickerModule,
        IgxIconModule,
        IgxInputGroupModule,
        IgxTimePickerModule,
        IgxSelectModule,
        IgxGridModule,
        IgxCheckboxModule,
        IgxCalendarModule,
        IgxDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private externalAuthService: ExternalAuthService) {
        /**
         * To register a social login, un-comment one or more of the following and add your service provider Client ID.
         * See https://github.com/IgniteUI/igniteui-cli/wiki/Angular-Authentication-Project-Template#add-a-third-party-social-provider
         */
        // this.externalAuthService.addGoogle('<CLIENT_ID>');

        // this.externalAuthService.addMicrosoft('<CLIENT_ID>');

        // this.externalAuthService.addFacebook('<CLIENT_ID>');
    }
}
