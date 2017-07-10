import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Member } from '../../model/member';
import { MemberService } from '../../services/member/member.service';
import { MemberDetailComponent } from '../member-detail/member-detail.component'

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  members: Member[];
  selectedMember: Member;
  isLoading: boolean;
  memberDialogRef: MdDialog;

  constructor(
    private memberService: MemberService,
    private dialog: MdDialog) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.memberService.getMembers().then((members) => {
      this.members = members;
      this.isLoading = false;
    })
  }

  onSelect(member: Member) {
    let memberDialogConfig = new MdDialogConfig();
    memberDialogConfig.height = '400px';
    memberDialogConfig.width = '400px';
    memberDialogConfig.data = { member };

    let a = this.dialog.open(MemberDetailComponent, memberDialogConfig);
    //this.selectedMember = member;
  }

}
