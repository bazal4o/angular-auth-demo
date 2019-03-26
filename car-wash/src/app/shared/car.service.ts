import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/Cars';


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
  public getCarTypes(): Observable<any> {
    return this.http.get(this.url + 'carTypes', httpOptions);
  }
  public getModelsByMake(make: string): Observable<any> {
    return this.http.get(this.url + 'models/' + make, httpOptions);
  }
  public getRegisteredCars(): Observable<any> {
    return this.http.get(this.url + 'registeredCars', httpOptions);
  }
  public registerCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url + 'registerCar', car, httpOptions);
  }
}
