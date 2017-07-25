import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MemberListComponent } from '../components/member-list/member-list.component';
import { MemberDetailComponent } from '../components/member-detail/member-detail.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SettingsComponent } from '../components/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'members', component: MemberListComponent, data: { title: 'Members list' } },
  { path: 'member/:id', component: MemberDetailComponent, data: { title: 'Member details' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
