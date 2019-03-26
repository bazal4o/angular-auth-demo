import { Component } from '@angular/core';
import { Customer } from '../models/Customer';
import { NgForm } from '@angular/forms';
import { CustomersService } from '../shared/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  public customer: Customer = new Customer();
  constructor(protected customerService: CustomersService, private router: Router) { }
  addClient(clientForm: NgForm) {
      this.customerService.registerCustomer(clientForm.value as Customer)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['customers-view']);
        },
        err => console.log('error'),
        () => console.log('done')
      );
  }
}
