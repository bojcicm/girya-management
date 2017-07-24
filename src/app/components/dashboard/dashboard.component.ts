import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { Member, PaidSubscription } from '../../model/member';
import { MemberAddComponent } from '../member-add/member-add.component';
import { MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import * as moment from 'moment';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  members: Observable<Member[]>;
  today: moment.Moment;
  pendingPaymentMembers: Observable<Member[]>;
  missedPaymentMembers: Observable<Member[]>;

  constructor(
    private dataService: DataService,
    private dialog: MdDialog,
    private router: Router,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.members = this.dataService.getAllMembers;
    this.today = moment();
    this.pendingPaymentMembers = this.dataService.getAllMembers
      .map(members => members.filter(m => {
        return this.getMemberIfIsPendingSubscription(m);
      }));
    this.missedPaymentMembers = this.dataService.getAllMembers
      .map(members => members.filter(m => {
        return this.getMemberIfIsMissedSubscription(m);
      }));
  }

  private getMemberIfIsPendingSubscription(m: Member): Member {
    if (!m.isActive) return;
    let memberSubscriptions = m.subscriptionPayments;
    let latestSubscription = memberSubscriptions[0];
    let subscriptionDate = moment(latestSubscription.subscriptionDate);
    let daydiff = this.today.diff(subscriptionDate, 'days');
    if (daydiff >= -7 && daydiff <= 0 && !latestSubscription.isPaid)
      return m;
  }

  private getMemberIfIsMissedSubscription(m: Member): Member {
    if (!m.isActive) return;
    let memberSubscriptions = m.subscriptionPayments;
    let latestSubscription = memberSubscriptions[0];
    let subscriptionDate = moment(latestSubscription.subscriptionDate);
    let daydiff = this.today.diff(subscriptionDate, 'days');
    if (daydiff > 7 && !latestSubscription.isPaid)
      return m;
  }

  dropDb() {
    //this.dataService.dropdb();
  }

  openAddMemberDialog() {
    let memberDialogConfig = new MdDialogConfig();
    memberDialogConfig.width = '500px';
    memberDialogConfig.data = {};

    let memberDialog = this.dialog.open(MemberAddComponent, memberDialogConfig);
    memberDialog.afterClosed().subscribe(result => {
      if (result && result.name) {
        let snackBarRef = this.snackBar.open('User saved: ' + result.name, null, {
          duration: 2000
        });
      }
    });
  }

  onSelect(memberId: string) {
    this.router.navigate(['/member', memberId]);
  }
}