import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterCarComponent } from './register-car.component';
import {
  IgxInputGroupModule,
  IgxButtonModule,
  IgxRippleModule,
  IgxIconModule,
  IgxComboModule,
  IgxDatePickerModule,
  IgxTimePickerModule,
  IgxSelectModule
} from 'igniteui-angular';

describe('RegisterCarComponent', () => {
  let component: RegisterCarComponent;
  let fixture: ComponentFixture<RegisterCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCarComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        IgxInputGroupModule,
        IgxButtonModule,
        IgxRippleModule,
        IgxIconModule,
        IgxComboModule,
        IgxDatePickerModule,
        IgxTimePickerModule,
        IgxSelectModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
