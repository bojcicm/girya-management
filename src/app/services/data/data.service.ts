import { Injectable, OnInit } from '@angular/core';
import { Member, PaidSubscription } from '../../model/member';
import * as DataStore from 'nedb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    dataChange: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);
    allMembers: Member[];

    db: DataStore = new DataStore({
        filename: 'data.db',
        autoload: true
    });

    constructor() {
        this.getMembers().then(members => {
            this.allMembers = members;
            this.dataChange.next(this.allMembers);
        });
    }

    get getAllMembers() {
        return this.dataChange.asObservable();
    }

    getMembers(): Promise<Member[]> {
        return new Promise((resolve, reject) => {
            if (this.allMembers)
                resolve(this.allMembers);

            this.db.find({}).exec((err, allMembersPaginated) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(<Member[]>allMembersPaginated);
            });
        });
    }

    addMember(member: Member): Promise<Member> {
        return new Promise((resolve, reject) => {
            this.db.insert(member, (err, memberCreated) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                this.allMembers.push(memberCreated);
                this.dataChange.next(this.allMembers);
                resolve(memberCreated);
            })
        })
    }

    updateMember(member: Member): Promise<Member> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: member._id }, {
                name: member.name,
                phoneNumber: member.phoneNumber,
                membershipSubscription: member.membershipSubscription,
                subscriptionPayments: member.subscriptionPayments,
                isActive: member.isActive
            }, {}, (err, numberOfDocsUpdated) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(member);
            })
        })
    }

    dropdb() {
        this.db.remove({}, { multi: true }, (e, d) => {
            console.log(d);
            console.log(e);
            this.allMembers = new Array<Member>();
            this.dataChange.next(this.allMembers);
        });
    }

    get data(): Member[] { return this.dataChange.value; }
}