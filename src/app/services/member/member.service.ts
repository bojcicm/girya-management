import { Injectable } from '@angular/core';
import { Member } from '../../model/member';


const MEMBERS: Member[] = [
  { id: 1, name: 'Mate Matic1', phoneNumber: '' },
  { id: 1, name: 'Mate Matic2', phoneNumber: '' },
  { id: 1, name: 'Mate Matic3', phoneNumber: '' },
  { id: 1, name: 'Mate Matic4', phoneNumber: '' },
  { id: 1, name: 'Mate Matic5', phoneNumber: '' },
  { id: 1, name: 'Mate Matic6', phoneNumber: '' },
  { id: 1, name: 'Mate Matic7', phoneNumber: '' },
  { id: 1, name: 'Mate Matic8', phoneNumber: '' },
]

@Injectable()
export class MemberService {

  constructor() { }

  getMembers(): Promise<Member[]> {
    return Promise.resolve(MEMBERS);
  }
}
