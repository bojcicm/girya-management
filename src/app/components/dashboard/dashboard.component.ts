import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Member, PaidSubscription } from '../../model/member';
import { MemberAddComponent } from '../member-add/member-add.component';
import { MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';

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
}
