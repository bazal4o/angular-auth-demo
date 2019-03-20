import { Component } from '@angular/core';
import { Customer } from '../models/Customer';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CustomersService } from '../shared/customers.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  public customer: Customer = new Customer();
  constructor(protected customerService: CustomersService) { }
  addClient(clientForm: NgForm) {
      this.customerService.registerCustomer(clientForm.value as Customer)
      .subscribe(
        response => {
          console.log(response);
          this.customer = new Customer();
        },
        err => console.log('error'),
        () => console.log('done')
      );
  }
}
