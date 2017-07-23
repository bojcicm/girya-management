import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA, MdDatepicker, MdDialogRef } from '@angular/material';
import { PaidSubscription, Member } from '../../model/member';
import { DataService } from '../../services/data/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.scss']
})
export class PaymentEditComponent implements OnInit {
  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;
  monthsInAdvance: number;
  isInAdvance: boolean;
  isSavingInProcess: boolean;
  member: Member;
  subscriptionPayment: PaidSubscription;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private dialogRef: MdDialogRef<PaymentEditComponent>,
    private dataService: DataService) { }

  ngOnInit() {
    this.member = this.data.member;
    this.subscriptionPayment = this.data.payment;
  }

  onSubmit() {
    this.isSavingInProcess = true;

    this.subscriptionPayment.isPaid = true;
    if (this.isInAdvance) {
      this.subscriptionPayment.paidInAdvance = this.monthsInAdvance;
    }

    let nextSubscription = new PaidSubscription();
    let nextMonth = this.isInAdvance ? this.monthsInAdvance : 1;
    nextSubscription.subscriptionDate = moment(this.subscriptionPayment.subscriptionDate).add(nextMonth, 'M').toDate();
    this.member.subscriptionPayments.push(nextSubscription);
    this.dataService.updateMember(this.member).then(member => {
      this.isSavingInProcess = false;
      this.dialogRef.close();
    });
  }

}
