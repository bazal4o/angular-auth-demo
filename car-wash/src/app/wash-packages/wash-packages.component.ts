import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { WashPackage } from '../models/wash-package';
import { Router } from '@angular/router';
import { WashService } from '../shared/wash.service';

@Component({
  selector: 'app-wash-packages',
  templateUrl: './wash-packages.component.html',
  styleUrls: ['./wash-packages.component.scss']
})
export class WashPackagesComponent implements OnInit {

  public items: WashPackage[] = [];
  constructor(private router: Router, private washService: WashService) { }

  ngOnInit() {
    this.washService.getPackages().subscribe(res => {
      this.items = res;
    });
  }
  createOrderFromPackage(packageID: string) {
     this.router.navigate(['register-order'],  { queryParams: { packageID: packageID }} );
  }
}
