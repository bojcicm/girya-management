import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MdDatepicker, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Member, PaidSubscription } from '../../model/member';
import * as moment from 'moment';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  isSavingInProcess: boolean;
  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;

  member: Member;

  constructor(
    private dialogRef: MdDialogRef<MemberEditComponent>,
    private dataService: DataService,
    private router: Router,
    @Inject(MD_DIALOG_DATA) public data: Member
  ) { }

  ngOnInit() {
    this.isSavingInProcess = false;
    this.member = this.data;
  }

  onSubmit() {
    this.isSavingInProcess = true;
    this.dataService.updateMember(this.member).then((member) => {
      this.isSavingInProcess = false;
      this.dialogRef.close(member);
    });
  }

  deleteMember() {
    if (confirm("Izbriši člana?")) {
      this.dataService.deleteMember(this.member).then(() => {
        this.router.navigate(['/members']);
      })
    }
  }
}