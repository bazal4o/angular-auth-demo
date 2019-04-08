import { Component, ViewChild, OnInit, PipeTransform, Pipe } from '@angular/core';
import { IgxDialogComponent } from 'igniteui-angular';
import { CarMake, CarModel, Car, CarType } from '../models/Cars';
import { CarService } from '../shared/car.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.scss']
})
export class RegisterCarComponent implements OnInit {
  /**
   *
   */
  constructor(private carService: CarService, private router: Router) { }

  @ViewChild('yearPickerDialog') public yearPickerDialog: IgxDialogComponent;
  @ViewChild('registerCarForm') public registerForm: NgForm;
  public fullYear = '';
  public car = new Car();
  public disableModels = true;
  public remoteMakes: CarMake[];
  public carModels: CarModel[];
  public carTypes: CarType[];
  public remoteMakeGroups: string[];
  public openYearDialog() {
    this.yearPickerDialog.open();
  }
  public closeYearDialog() {

    this.yearPickerDialog.close();
  }
  public yearFormatter(date: Date) {
    if (date) {
      this.car.year = date.getFullYear().toString();
    }
  }
  public makeSelected(event: any) {
    const item = event.newSelection;
    const makeId = item.value;
    this.carService.getModelsByMake(makeId).subscribe((res) => {
      const models = res.Models;
      const result: CarModel[] = [];
      for (let index = 0; index < models.length; index++) {
        const element = models[index];
        result.push(new CarModel(element.model_name, element.model_make_id));
      }
      this.carModels = result;
      this.disableModels = !(this.carModels.length > 0);
    });
  }

  ngOnInit(): void {
    this.carService.getMakes().subscribe((res) => {
      const makes = res.Makes;
      const result: CarMake[] = [];
      for (let index = 0; index < makes.length; index++) {
        const element = makes[index];
        result.push(new CarMake(element.make_id, element.make_display));
      }
      this.remoteMakes = result;
      this.remoteMakeGroups = result.map(item => {
        return { id: item.id.substring(0, 1), name: item.name };
      }).map(item => item.id.toLocaleUpperCase()).filter((value, index, self) => self.indexOf(value) === index);
    });
    this.carService.getCarTypes().subscribe((res) => {
      const result: CarType[] = [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        result.push(new CarType(element.id, element.name));
      }
      this.carTypes = result;
    });
  }

  registerCar(carModel: NgForm) {
    this.carService.registerCar(carModel.value as Car).subscribe((res) => {
      console.log(res);
      this.router.navigate(['registered-cars']);
    },
    (err) => console.log(err)
     );
  }
}

@Pipe({ name: 'filterByLetter' })
export class FilterByLetterPipe implements PipeTransform {
  public transform(collection: any[], term = '') {
    const result = collection.filter((item) =>
      item.id.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
    return result;
  }
}
