import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Member, PaidSubscription } from '../../model/member';
import { MemberAddComponent } from '../member-add/member-add.component';
import { MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog: MdDialog,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {

  }

  dropDb() {
    var a = this.getActiveMembersWithPendingPayment;
    var b = this.getActiveMembersWithMissedPayment;
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

  get getActiveMembersWithPendingPayment(): Member[] {
    let today = moment();
    let members = this.dataService.allMembers;
    if (!members) return null;
    return members.filter(member => {
      let memberSubscriptions = member.subscriptionPayments;
      let latestSubscription = memberSubscriptions.sort((a, b) => <any>b.subscriptionDate - <any>a.subscriptionDate)[0];
      let subscriptionDate = moment(latestSubscription.subscriptionDate);
      let daydiff = today.diff(subscriptionDate, 'days');
      if (daydiff >= 0 && daydiff <= 7 && !latestSubscription.isPaid)
        return member;
    });
  }

  get getActiveMembersWithMissedPayment() {
    let today = moment();
    let members = this.dataService.allMembers;
    if (!members) return null;
    return members.filter(member => {
      let memberSubscriptions = member.subscriptionPayments;
      let latestSubscription = memberSubscriptions.sort((a, b) => <any>b.subscriptionDate - <any>a.subscriptionDate)[0];
      let subscriptionDate = moment(latestSubscription.subscriptionDate);
      let daydiff = today.diff(subscriptionDate, 'days');
      if (daydiff > 7 && !latestSubscription.isPaid)
        return member;
    });
  }
}
