import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  // const serverURL =
  ngOnInit() {
  }
  register(form) {
    this.http.post('http://localhost:3008/register', form.value, httpOptions)
    .subscribe(
      response => {
        console.log(response);
      },
      () => console.log('Authentication Complete'));
  }
}
