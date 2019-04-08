import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstnamelastname'
})
export class FirstnamelastnamePipe implements PipeTransform {

  transform(customer: any): any {
    if (customer.firstName.length > 0 || customer.lastName.length > 0) {
      return customer.firstName + ' ' + customer.lastName;
    }
    return '';
  }

}
