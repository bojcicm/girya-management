import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  dropDb() {
    if (confirm("Izbriši sve?")) {
      if (confirm("Jesi li stvarno stvarno siguran??!!")) {
        if (confirm("Nemos se vratit iz ovoga!!")) {
          //this.dataService.dropdb();
        }
      }
    }
  }

}
