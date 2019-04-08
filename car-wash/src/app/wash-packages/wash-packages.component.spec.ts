import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashPackagesComponent } from './wash-packages.component';

describe('WashPackagesComponent', () => {
  let component: WashPackagesComponent;
  let fixture: ComponentFixture<WashPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
