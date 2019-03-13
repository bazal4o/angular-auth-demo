import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(loginForm: any) {
    this.http.post('http://localhost:3008/login', loginForm.value, httpOptions)
    .subscribe(
      response => {
        console.log(response);
      },
      (error: HttpErrorResponse) => console.log('Authentication Failed: ' + error.error)
      ,
      () => console.log('Authentication Complete'));
  }
}
