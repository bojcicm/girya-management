import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdListModule, MdButtonModule, MdIconModule, MdCardModule } from '@angular/material';

let importedMaterialModules: Array<any> = [
  FlexLayoutModule,
  BrowserAnimationsModule, 
  MdToolbarModule,
  MdListModule,
  MdButtonModule,
  MdIconModule,
  MdCardModule
];

@NgModule({
  imports: [].concat(CommonModule,importedMaterialModules),
  exports: importedMaterialModules,
  declarations: []
})
export class MaterialThemeImportModuleModule { }
