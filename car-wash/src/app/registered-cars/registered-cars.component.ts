import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car.service';
import { Car } from '../models/Cars';

@Component({
  selector: 'app-registered-cars',
  templateUrl: './registered-cars.component.html',
  styleUrls: ['./registered-cars.component.scss']
})
export class RegisteredCarsComponent implements OnInit {
  public registeredCars: Car[];
  title = 'registered-cars';
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getRegisteredCars().subscribe((response: Car[]) => {
      this.registeredCars = response;
    },
      (err) => console.log(err)
    );

  }
}
