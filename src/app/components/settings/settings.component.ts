import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

const { dialog } = electron.remote;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  saveDb() {
    this.dataService.getMembers(true).then(members => {
      var a = dialog.showSaveDialog({
        options: {
          "title": 'backup.json',
          "defaultPath": 'backup.json'
        }
      }, (value: string) => {
        if (!value.endsWith(".json"))
          value = value + ".json";

        var fsl = fs;
        try { fsl.writeFileSync(value, JSON.stringify({ members }), 'utf-8'); }
        catch (e) { alert(e); }
      });
    })

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
