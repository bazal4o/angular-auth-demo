import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  url = 'http://localhost:3008/';
  constructor(protected http: HttpClient) {}
  getCustomers() {}
  getCustomerById() {}
  hasCustomerByFullName() {}
  registerCustomer(customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.url + 'registerCustomer', customer, httpOptions);
  }
  //   return this.http.post<Customer>(this.url + 'registerCustomer', customer)
  //     .subscribe(response => {
  //         console.log(response);
  //       },
  //       () => {
  //         console.log('Server has registered the customer');
  //       }
  //     );
  // }
}
