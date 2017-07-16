import { Injectable, OnInit } from '@angular/core';
import { Member, PaidSubscription } from '../../model/member';
import * as DataStore from 'nedb';

@Injectable()
export class DataService {
    db: DataStore = new DataStore({
        filename: 'data.db',
        autoload: true
    });

    constructor() { }

    getMembers(): Promise<Member[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}).exec((err, allMembersPaginated) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(<Member[]>allMembersPaginated);
            });
        });
    }
}