import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WashService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3008/';
  public getPackages(): Observable<any> {
    return this.http.get(this.url + 'wash-packages', httpOptions);
  }
  public getServices(): Observable<any> {
    return this.http.get(this.url + 'extra-services', httpOptions);
  }
}
