import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDatepicker } from '@angular/material';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  isFormValid: boolean;
  isSavingInProcess: boolean;
  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;
  constructor() { }

  ngOnInit() {
    // debugger;
    this.isSavingInProcess = false;
  }

  onSave() {
    this.isSavingInProcess = true;
  }

}
