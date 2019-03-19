import { Component } from '@angular/core';
import { Customer } from '../models/Customer';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }
  addClient(clientForm: NgForm) {

      this.http.post('http://localhost:3008/addclient', clientForm.value)
      .subscribe(response => {
          console.log(response);
        },
        (error: HttpErrorResponse) => console.log('Client Registration Failed: ' + error.error),
        () => {
          console.log('Server has registered the client');
          this.customer = new Customer();
        }
      );
  }
}
