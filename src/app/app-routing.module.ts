import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListMoneyComponent } from './dashboard/list-money/list-money.component';

const routes: Routes = [
  { path: 'money/:tipo', component: ListMoneyComponent},
  { path: '', component: DashboardComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
