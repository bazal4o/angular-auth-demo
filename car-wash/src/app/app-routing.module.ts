import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomersViewComponent } from './customers-view/customers-view.component';
import { RegisterCarComponent } from './register-car/register-car.component';
import { RegisteredCarsComponent } from './registered-cars/registered-cars.component';
import { WashPackagesComponent } from './wash-packages/wash-packages.component';
import { RegisterOrderComponent } from './register-order/register-order.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { text: 'Home' } },
    { path: 'error', component: UncaughtErrorComponent },
    { path: 'client', component: CustomerComponent, data: { text: 'client' } },
    { path: 'customers-view', component: CustomersViewComponent, data: { text: 'customers-view' } },
    { path: 'register-car', component: RegisterCarComponent, data: { text: 'register-car' } },
    { path: 'registered-cars', component: RegisteredCarsComponent, data: { text: 'registered-cars' } },
    { path: 'wash-packages', component: WashPackagesComponent, data: { text: 'wash-packages' } },
    { path: 'register-order', component: RegisterOrderComponent, data: { text: 'register-order' } },
    // { path: 'register-order/:packageID', component: RegisterOrderComponent, data: { text: 'register-order' } },
    { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
    imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
    exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
