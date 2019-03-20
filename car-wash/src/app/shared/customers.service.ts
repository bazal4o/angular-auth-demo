import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';

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
  getCustomers(): Observable<any> {
    return this.http.get(this.url + 'customers', httpOptions);
  }
  getCustomerById() {}
  hasCustomerByFullName() {}
  registerCustomer(customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.url + 'registerCustomer', customer, httpOptions);
  }
}
