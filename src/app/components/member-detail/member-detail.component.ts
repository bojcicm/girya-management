import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../model/member';
import { MemberService } from '../../services/member/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {

  @Input() member: Member;

  members: Member[];
  selectedMember: Member;

  constructor(private memberService: MemberService) { }
  ngOnInit(): void {
    this.memberService.getMembers().then((members) => {
      this.members = members;
    })
  }

  onSelect(member: Member) {
    this.selectedMember = member;
  }

}