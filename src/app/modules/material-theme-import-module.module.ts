import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdToolbarModule, MdListModule, MdButtonModule,
  MdIconModule, MdCardModule, MdSidenavModule,
  MdDialogModule, MdTableModule, MdInputModule,
  MdDatepickerModule, MdNativeDateModule, MdCheckboxModule, MdProgressSpinnerModule,
  MdSnackBarModule
} from '@angular/material';

let importedMaterialModules: Array<any> = [
  FlexLayoutModule,
  BrowserAnimationsModule,
  MdSidenavModule,
  MdToolbarModule,
  MdListModule,
  MdButtonModule,
  MdIconModule,
  MdCardModule,
  MdDialogModule,
  MdTableModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdCheckboxModule,
  MdProgressSpinnerModule,
  MdSnackBarModule
];

@NgModule({
  imports: [].concat(CommonModule, importedMaterialModules),
  exports: importedMaterialModules,
  declarations: []
})
export class MaterialThemeImportModuleModule { }