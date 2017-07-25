import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { MaterialThemeImportModuleModule } from './modules/material-theme-import-module.module';
import { AppRoutingModule } from './modules/app-routing.module'

import { DataService } from './services/data/data.service';

import { AppComponent } from './components/app/app.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MemberAddComponent } from './components/member-add/member-add.component';
import { PaymentEditComponent } from './components/payment-edit/payment-edit.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailComponent,
    MemberListComponent,
    DashboardComponent,
    MemberAddComponent,
    PaymentEditComponent,
    MemberEditComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CdkTableModule,
    AppRoutingModule,
    MaterialThemeImportModuleModule
  ],
  entryComponents: [
    MemberDetailComponent, MemberAddComponent, PaymentEditComponent, MemberEditComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }