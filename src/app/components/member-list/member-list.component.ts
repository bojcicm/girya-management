import { Component, OnInit } from '@angular/core';
import { Member } from '../../model/member';
import { MemberService } from '../../services/member/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  selectedMember: Member;
  isLoading: boolean;

  constructor(private memberService: MemberService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.memberService.getMembers().then((members) => {
      this.members = members;
      this.isLoading = false;
    })
  }

  onSelect(member: Member) {
    this.selectedMember = member;
  }

}
