import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { MaterialThemeImportModuleModule } from './modules/material-theme-import-module.module';
import { AppRoutingModule } from './modules/app-routing.module'

import { MemberService } from './services/member/member.service';
import { DataService } from './services/data/data.service';

import { AppComponent } from './components/app/app.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MemberAddComponent } from './components/member-add/member-add.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailComponent,
    MemberListComponent,
    DashboardComponent,
    MemberAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CdkTableModule,
    AppRoutingModule,
    MaterialThemeImportModuleModule
  ],
  entryComponents: [
    MemberDetailComponent, MemberAddComponent
  ],
  providers: [MemberService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }