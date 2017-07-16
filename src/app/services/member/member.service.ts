import { Injectable, OnInit } from '@angular/core';
import { Member } from '../../model/member';
import { DataService } from '../data/data.service';
import * as DataStore from 'nedb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MemberService {
  private db: DataStore = this.databaseService.db;
  dataChange: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);

  constructor(private databaseService: DataService) {
    this.databaseService.getMembers().then((members) => {
      members.forEach(member => {
        let copiedData = this.data.slice();
        copiedData.push(member);
        this.dataChange.next(copiedData);
      });
    });
  }

  /** Stream that emits whenever the data has been modified. */
  get data(): Member[] { return this.dataChange.value; }
}
