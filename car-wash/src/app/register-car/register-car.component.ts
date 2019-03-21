import { Component, ViewChild, OnInit, PipeTransform, Pipe } from '@angular/core';
import { IgxDialogComponent } from 'igniteui-angular';
import { carMakesData } from './makes';
import { Make, Model } from '../models/Cars';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.scss']
})


export class RegisterCarComponent implements OnInit {
  /**
   *
   */
  constructor(private carService: CarService) {  }

  @ViewChild('yearPickerDialog') public yearPickerDialog: IgxDialogComponent;
  public user = {
    dateTime: new Date(),
    email: '',
    fullName: '',
    genres: '',
    movie: '',
    phone: ''
  };

  public car = {
    model: '',
    make: '',
    registrationPlate: '',
    fullYear: '',
    year: ''
  };

 
  public disableModels = true;
  public remoteMakes: Make[];
  public carModels: Model[];
  public remoteMakeGroups: string[];
  public formatedYear = this.car.year === '' ? '' : Date.parse(this.car.year);
  public makes = [
    { alpha: 'A' , make: ['Audi', 'Alfa Romeo']},
    { alpha: 'B' , make: ['BMW', 'Bugatti', 'Bentley']},
    // tslint:disable-next-line:object-literal-sort-keys
    { alpha: 'O' , make: ['Opel']},
    { alpha: 'P' , make: ['Peugeot']}];

    public genres = [
      { type: 'Action' , movies: ['The Matrix', 'Kill Bill: Vol.1', 'The Dark Knight Rises']},
      { type: 'Adventure' , movies: ['Interstellar', 'Inglourious Basterds', 'Inception']},
      // tslint:disable-next-line:object-literal-sort-keys
      { type: 'Comedy' , movies: ['Wild Tales', 'In Bruges', 'Three Billboards Outside Ebbing, Missouri',
      'Untouchable', '3 idiots']},
      { type: 'Crime' , movies: ['Training Day', 'Heat', 'American Gangster']},
      { type: 'Drama' , movies: ['Fight Club', 'A Beautiful Mind', 'Good Will Hunting', 'City of God']},
      { type: 'Biography' , movies: ['Amadeus', 'Bohemian Rhapsody']},
      { type: 'Mystery' , movies: ['The Prestige', 'Memento', 'Cloud Atlas']},
      { type: 'Musical' , movies: ['All That Jazz']},
      { type: 'Romance' , movies: ['Love Actually', 'In The Mood for Love']},
      { type: 'Sci-Fi' , movies: ['The Fifth Element']},
      { type: 'Thriller' , movies: ['The Usual Suspects']},
      { type: 'Western' , movies: ['Django Unchained']}];

      public carMakesData = carMakesData;
      public onDateSelection(value) {
        this.user.dateTime.setDate((value as Date).getDate());
      }

      public openYearDialog() {
        this.yearPickerDialog.open();
      }
      public closeYearDialog() {

        this.yearPickerDialog.close();
      }
      public yearFormater(date: Date): string {
        if (date) {
          return date.getFullYear().toString();
        }
        return '';
      }
      public makeSelected(event: any) {
        const item = event.newSelection;
        const makeId = item.value;
        this.carService.getModelsByMake(makeId).subscribe((res) => {
          const models = res.Models;
          const result: Model[] = [];
          for (let index = 0; index < models.length; index++) {
            const element = models[index];
            result.push(new Model(element.model_name, element.model_make_id));
          }
          this.carModels = result;
          this.disableModels = !(this.carModels.length > 0);
        });
      }

      ngOnInit(): void {
        this.carService.getMakes().subscribe((res) => {
          const makes = res.Makes;
          const result: Make[] = [];
          for (let index = 0; index < makes.length; index++) {
            const element = makes[index];
            result.push(new Make(element.make_id, element.make_display));
          }
          this.remoteMakes = result;
          this.remoteMakeGroups = result.map(item => {
            return { id : item.id.substring(0, 1), name: item.name };
          }).map(item => item.id.toLocaleUpperCase()).filter((value, index, self) => self.indexOf(value) === index);
        });
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
