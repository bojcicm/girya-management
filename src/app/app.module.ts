import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { MaterialThemeImportModuleModule } from './modules/material-theme-import-module.module';
import { AppRoutingModule } from './modules/app-routing.module'

import { MemberService } from './services/member/member.service';

import { AppComponent } from './app.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailComponent,
    MemberListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CdkTableModule,
    AppRoutingModule,
    MaterialThemeImportModuleModule
  ],
  entryComponents: [
    MemberDetailComponent
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }