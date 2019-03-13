import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ClientComponent } from './client.component';
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

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientComponent],
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
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
