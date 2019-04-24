import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { CarService } from '../shared/car.service';
import { CustomersViewModel } from '../models/Customer';
import { CustomersService } from '../shared/customers.service';
import { AutocompleteItemSelectionEventArgs } from 'igniteui-angular/lib/directives/autocomplete/autocomplete.directive';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WashPackage } from '../models/wash-package';
import { WashService } from '../shared/wash.service';
import { IgxInputDirective } from 'igniteui-angular';
import { ExtraService } from '../models/extra-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-order',
  templateUrl: './register-order.component.html',
  styleUrls: ['./register-order.component.scss']
})
export class RegisterOrderComponent implements OnInit, OnDestroy {

  private packageID = -1;
  selectedPackage: WashPackage;
  public order = {
    customerID: '',
    customerName: '',
    registrationPlate: '',
    packageID: this.packageID,
    carID: '',
    status: '',
    orderCreationDate: '',
    extraServices: [],
    orderDate: Date,
    orderTimeSlot: Date
  };

  public customer = {
    id: '',
    firstName: '',
    lastName: '',
    fullName: ''
  };
    get fullCustomerName(): string {
    if (this.customer.firstName.length > 0 || this.customer.lastName.length > 0) {
      return this.customer.firstName + ' ' + this.customer.lastName;
    }
    return '';
  }
  public registeredCustomers: CustomersViewModel[] = [];
  public sub: Subscription;
  public packages: WashPackage[] = [];
  public extraServices: ExtraService[] = [];

  @ViewChild('customerInput', {read: IgxInputDirective })
  public clientInput: IgxInputDirective;
  constructor(private carService: CarService,
    private customerService: CustomersService,
    private route: ActivatedRoute,
    private washService: WashService) {

  }

  public onDateSelection(value) {
    // this.user.dateTime.setDate((value as Date).getDate());
  }

  public onTimeSelection(event) {
    // this.user.dateTime.setTime((event.newValue as Date).getTime());
  }
  public clientSelected(event: AutocompleteItemSelectionEventArgs) {
    if (!event.value) {
      event.cancel = true;
    } else {
      const currentCustomer = this.registeredCustomers.find(u => u.id ===  parseInt(event.value, 10));
      if (currentCustomer) {
        this.customer.id = currentCustomer.id.toString();
        this.customer.firstName = currentCustomer.firstName;
        this.customer.lastName = currentCustomer.lastName;
        this.customer.fullName = this.fullCustomerName;
        this.customerService.getCarByCustomerId(this.customer.id).subscribe(car => {
          this.order.registrationPlate = car.registration_plate;
        }, err => console.log('No cars registered to this customer'));
      }
    }
  }
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(res => {
      this.registeredCustomers = res;
    });
    this.sub = this.route.queryParams.subscribe(
      par => {
        this.packageID = par['packageID'] ? parseInt(par['packageID'], 10) : -1;
      }
    );
    this.washService.getPackages().subscribe(res => {
      this.packages = res;
      if (this.packageID > -1) {
        this.selectedPackage = this.packages.find(p => p.id === this.packageID);
      }
    });
    this.washService.getServices().subscribe(res => {
      this.extraServices = res;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  registerOrder(orderModel: NgForm) {

    // this.carService.registerCar(carModel.value as Car).subscribe((res) => {
    //   console.log(res);
    //   // this.router.navigate(['registered-cars']);
    // },
    // (err) => console.log(err)
    //  );
  }
}
