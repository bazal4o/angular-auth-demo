import { Pipe, PipeTransform } from '@angular/core';
import { CustomersViewModel } from '../models/Customer';

@Pipe({
  name: 'customerfiltering'
})
export class CustomerfilteringPipe implements PipeTransform {

  transform(customers: CustomersViewModel[], term?: any): CustomersViewModel[] {
    return customers.filter(ft => ft.firstName.toLocaleLowerCase().startsWith(term.toLocaleLowerCase()));
  }

}
