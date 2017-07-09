import { Injectable } from '@angular/core';
import { Member } from '../../model/member';


const MEMBERS: Member[] = [
  { id: 1, name: 'Mate Matic1' },
  { id: 1, name: 'Mate Matic2' },
  { id: 1, name: 'Mate Matic3' },
  { id: 1, name: 'Mate Matic4' },
  { id: 1, name: 'Mate Matic5' },
  { id: 1, name: 'Mate Matic6' },
  { id: 1, name: 'Mate Matic7' },
  { id: 1, name: 'Mate Matic8' },
]

@Injectable()
export class MemberService {

  constructor() { }

  getMembers(): Promise<Member[]> {
    return Promise.resolve(MEMBERS);
  }
}
