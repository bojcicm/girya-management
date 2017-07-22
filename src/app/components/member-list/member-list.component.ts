import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Member } from '../../model/member';
import { DataService } from '../../services/data/data.service';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  displayedColumns = ['name', 'phoneNumber', 'info'];
  memberDataSource: ExampleDataSource | null;
  selectedMember: Member;

  @ViewChild('filter') filter: ElementRef;

  constructor(
    private dataService: DataService,
    private dialog: MdDialog,
  ) { }

  ngOnInit(): void {
    this.memberDataSource = new ExampleDataSource(this.dataService);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.memberDataSource) { return; }
        this.memberDataSource.filter = this.filter.nativeElement.value;
      });
  }

  onSelect(member: Member) {
    let memberDialogConfig = new MdDialogConfig();
    memberDialogConfig.height = '400px';
    memberDialogConfig.width = '400px';
    memberDialogConfig.data = { member };

    let a = this.dialog.open(MemberDetailComponent, memberDialogConfig);
  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
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

