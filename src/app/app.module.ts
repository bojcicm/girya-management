import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialThemeImportModuleModule } from './modules/material-theme-import-module/material-theme-import-module.module';
import { AppComponent } from './app.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

import { MemberService } from './services/member/member.service';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialThemeImportModuleModule
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
