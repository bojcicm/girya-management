import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDatepicker, MdDialogRef } from '@angular/material';
import { Member, PaidSubscription } from '../../model/member';
import * as moment from 'moment';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  isFormValid: boolean;
  isSavingInProcess: boolean;
  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;

  member: Member;
  isCurrentMonthPaid: boolean;
  memberStartDate: Date;

  constructor(
    private dialogRef: MdDialogRef<MemberAddComponent>,
    private dataService: DataService) { }

  ngOnInit() {
    this.isSavingInProcess = false;
    this.member = new Member();
  }

  onSubmit() {
    this.isSavingInProcess = true;
    let subscription = new PaidSubscription();
    subscription.subscriptionDate = this.memberStartDate;
    subscription.isPaid = this.isCurrentMonthPaid;

    this.member.subscriptionPayments = new Array<PaidSubscription>();
    this.member.subscriptionPayments.push(subscription);

    if (this.isCurrentMonthPaid) {
      let upcommingSubscription = new PaidSubscription();
      upcommingSubscription.subscriptionDate = moment(this.memberStartDate).add(1, 'M').toDate();
      upcommingSubscription.isPaid = false;
      this.member.subscriptionPayments.push(upcommingSubscription);
    }

    this.dataService.addMember(this.member).then((member) => {
      this.isSavingInProcess = false;
      this.dialogRef.close(member);
    });
  }
}