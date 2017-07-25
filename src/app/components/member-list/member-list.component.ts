import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Member } from '../../model/member';
import { DataService } from '../../services/data/data.service';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberAddComponent } from '../member-add/member-add.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})

export class MemberListComponent implements OnInit {
  displayedColumns = ['name', 'phoneNumber', 'active', 'info'];
  memberDataSource: MemberFilterDataSource | null;
  selectedMember: Member;

  @ViewChild('filter') filter: ElementRef;

  constructor(
    private dataService: DataService,
    private dialog: MdDialog,
    private router: Router,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit(): void {
    this.memberDataSource = new MemberFilterDataSource(this.dataService);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.memberDataSource) { return; }
        this.memberDataSource.filter = this.filter.nativeElement.value;
      });
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

  onSelect(member: Member) {
    this.router.navigate(['/member', member._id]);
  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class MemberFilterDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private dataService: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Member[]> {
    const displayDataChanges = [
      this.dataService.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.dataService.data.slice();
      return data.filter((item: Member) => {
        let searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}

