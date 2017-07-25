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
  subscriptionDate: Date;
  isInAdvance: boolean;
  isMemberStaying: boolean = true;
  isSavingInProcess: boolean;
  member: Member;
  subscriptionPayment: PaidSubscription;
  isDetails: boolean;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: IPaymentDialogData,
    private dialogRef: MdDialogRef<PaymentEditComponent>,
    private dataService: DataService) { }

  ngOnInit() {

    if (this.data && this.data.member)
      this.member = this.data.member;

    if (this.data && this.data.payment) {
      this.subscriptionPayment = this.data.payment;
      this.subscriptionDate = this.data.payment.subscriptionDate;
    }
    else {
      this.subscriptionPayment = new PaidSubscription();
      this.subscriptionDate = new Date();
    }

    if (this.data && this.data.isDetailsView) {
      this.isDetails = true;
    }
  }

  onSubmit() {
    this.isSavingInProcess = true;

    this.subscriptionPayment.isPaid = true;
    if (this.isInAdvance) {
      this.subscriptionPayment.paidInAdvance = this.monthsInAdvance;
    }

    if (this.isMemberStaying) {
      let nextSubscription = new PaidSubscription();
      let nextMonth = this.isInAdvance ? this.monthsInAdvance : 1;
      nextSubscription.subscriptionDate = moment(this.subscriptionPayment.subscriptionDate).add(nextMonth, 'M').toDate();
      this.member.subscriptionPayments.push(nextSubscription);
      this.member.isActive = true;
    }
    this.dataService.updateMember(this.member).then(member => {
      this.isSavingInProcess = false;
      this.dialogRef.close();
    });
  }

}

interface IPaymentDialogData {
  member: Member;
  payment?: PaidSubscription;
  isDetailsView?: boolean;
}
