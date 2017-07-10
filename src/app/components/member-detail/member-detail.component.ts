import { Component, Input, Inject, Optional, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Member } from '../../model/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(
    private dialogRef: MdDialogRef<MemberDetailComponent>,
    @Optional() @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    debugger;
    this.member = this.data.member;
  }
}
