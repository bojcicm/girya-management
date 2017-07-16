import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Member, PaidSubscription } from '../../model/member';
import { MemberAddComponent } from '../member-add/member-add.component';
import { MdDialog, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  openAddMemberDialog() {
    let memberDialogConfig = new MdDialogConfig();
    //memberDialogConfig.height = '500px';
    memberDialogConfig.width = '500px';
    memberDialogConfig.data = {};

    let a = this.dialog.open(MemberAddComponent, memberDialogConfig);
  }

  addMember() {
    const subscriptionPayments: Array<PaidSubscription> = new Array<PaidSubscription>();

    const member: Member = new Member();

    member.name = "Ante";
    member.phoneNumber = "0977997990";
    member.membershipSubscription = "3xBB";
    member.subscriptionPayments = subscriptionPayments;
    member.isActive = true;

    this.dataService.db.insert(member, (err, newMember) => {
      if (err)
        console.log(err);
      else
        console.log(newMember);
    })
  }
}
