import { Component } from '@angular/core';
import { Client } from '../models/client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent {
  public user = {
    dateTime: new Date(),
    email: '',
    fullName: '',
    genres: '',
    movie: '',
    phone: ''
  };
  public client: Client = new Client;

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

  public onDateSelection(value) {
    this.user.dateTime.setDate((value as Date).getDate());
  }

  public onTimeSelection(event) {
    this.user.dateTime.setTime((event.newValue as Date).getTime());
  }

  addClient(client: NgForm) {
    const cl = client.value as Client;
    console.log(client.value);
  }
}
