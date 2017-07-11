import { Injectable } from '@angular/core';
import * as RxDB from 'rxdb';
import { RxDatabase, QueryChangeDetector } from 'rxdb';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

const adapters = {
  //localstorage: require('pouchdb-adapter-localstorage'),
  websql: require('pouchdb-adapter-websql')
  //idb: require('pouchdb-adapter-idb')
};
const useAdapter = 'websql';
RxDB.plugin(adapters[useAdapter]);


// RxDB.plugin(require('pouchdb-adapter-http'));
// RxDB.plugin(require('pouchdb-replication'));

let collections = [
  {
    name: 'member',
    schema: require('./member.schema.json'),
    sync: false
  }
];

@Injectable()
export class DataService {

  static dbPromise: Promise<RxDatabase> = null;
  private async _create(): Promise<RxDatabase> {

    console.log('DatabaseService: creating database..');
    const db = await RxDB.create({ name: 'heroesdb', adapter: useAdapter, password: 'myLongAndStupidPassword' });
    console.log('DatabaseService: created database');

    window['db'] = db; // write to window for debugging

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    return db;
  }

  get(): Promise<RxDatabase> {
    if (DataService.dbPromise)
      return DataService.dbPromise;

    // create database
    DataService.dbPromise = this._create();
    return DataService.dbPromise;
  }
}