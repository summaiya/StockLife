import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllstocksComponent } from './allstocks/allstocks.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MystockComponent } from './mystock/mystock.component';
import { SignupComponent } from './signup/signup.component';
import { SingleStockComponent } from './single-stock/single-stock.component';
import { AuthGuardServiceService } from './_guard/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardServiceService],
    children: [
      { path: '', component: DashboardHomeComponent },
      {
        path: 'all-stocks',
        component: AllstocksComponent,
      },
      {
        path: 'stocks/:id',
        component: SingleStockComponent,
      },
      {
        path: 'dashboard',
        component: MystockComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
