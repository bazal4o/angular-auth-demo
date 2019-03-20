import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../shared/customers.service';
import { CustomersViewModel } from '../models/Customer';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.scss']
})
export class CustomersViewComponent implements OnInit {
  public localData: any[];
  title = 'customers-view';
  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((response: CustomersViewModel[]) => {
      this.localData = response;
    });
  }
}
