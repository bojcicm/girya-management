import { Component, Input, Inject, Optional, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Member, PaidSubscription } from '../../model/member';
import { DataService } from '../../services/data/data.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { PaymentEditComponent } from '../payment-edit/payment-edit.component';
import { MemberEditComponent } from '../member-edit/member-edit.component'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MdDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let memberId = params.get('id');
        return this.dataService.getMembers().then(members => members.find(m => m._id == memberId));
      }).subscribe((member: Member) => this.member = member);
  }

  get memberPayments() {
    return this.member.subscriptionPayments.sort((a, b) => {
      return <any>b.subscriptionDate - <any>a.subscriptionDate;
    });
  }

  areAllPaymentsPaid(): boolean {
    return this.member.subscriptionPayments.every(p => p.isPaid);
  }

  addPayment() {
    let newSub = new PaidSubscription();
    newSub.subscriptionDate = new Date();
    this.member.subscriptionPayments.push(newSub);
    this.edit(newSub);
  }

  edit(payment: PaidSubscription) {
    let paymentDialogConfig = new MdDialogConfig();
    paymentDialogConfig.width = '500px';
    paymentDialogConfig.data = {
      payment: payment,
      member: this.member
    };
    this.openPaymentDialog(paymentDialogConfig);
  }

  details(payment: PaidSubscription) {
    let paymentDialogConfig = new MdDialogConfig();
    paymentDialogConfig.width = '500px';
    paymentDialogConfig.data = {
      payment: payment,
      member: this.member,
      isDetailsView: true
    };
    this.openPaymentDialog(paymentDialogConfig);
  }

  private openPaymentDialog(config: MdDialogConfig) {
    let paymentDialog = this.dialog.open(PaymentEditComponent, config);
  }

  delete(payment: PaidSubscription) {
    if (confirm("Izbriši plaćanje?")) {
      this.member.subscriptionPayments = this.member.subscriptionPayments
        .filter(p => p.subscriptionDate != payment.subscriptionDate);

      this.dataService.updateMember(this.member);
    }
  }

  editDetails() {
    let editDetailsDialogConfig = new MdDialogConfig();
    editDetailsDialogConfig.width = '500px';
    editDetailsDialogConfig.data = this.member;

    let memberDialog = this.dialog.open(MemberEditComponent, editDetailsDialogConfig);
  }
}
