import { Component, OnInit } from '@angular/core';
import { Member } from './model/member';
import { MemberService } from './services/member/member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
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