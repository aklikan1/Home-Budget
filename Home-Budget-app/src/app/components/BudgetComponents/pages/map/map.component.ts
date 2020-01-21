import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {

  date: FormControl = new FormControl(moment());

  constructor() {}

  ngOnInit(): void {
    console.log(this.date.value);
  }

  chosenYearHandler(normalizedYear: Moment) {
    let ctrlValue: Moment = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    console.log(ctrlValue.date());
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<any>) {
    let ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  showDate() {
    //console.log(this.date.value);
  }
}
