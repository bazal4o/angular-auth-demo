import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  getCustomerById() {
    // return this.http.get(this.url + '')
  }
  getCarByCustomerId(id: string): Observable<any> {
    if (id) {
      httpOptions['params'] = new HttpParams().set('id', id);
    }
    return this.http.get<any>(this.url + 'getCarByCustomerId', httpOptions);
  }
  hasCustomerByFullName() {}
  registerCustomer(customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.url + 'registerCustomer', customer, httpOptions);
  }
}
