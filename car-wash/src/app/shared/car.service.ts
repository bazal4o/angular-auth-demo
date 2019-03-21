import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3008/';
  public getMakes(): Observable<any> {
    return this.http.get(this.url + 'makes', httpOptions);
  }
  public getModelsByMake(make: string): Observable<any> {
    return this.http.get(this.url + 'models/' + make, httpOptions);
  }
}
