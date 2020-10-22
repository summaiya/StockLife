import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllbusinessesComponent } from './allbusinesses/allbusinesses.component';
import { AllstocksComponent } from './allstocks/allstocks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyBusinessesComponent } from './my-businesses/my-businesses.component';
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
      { path: '', component: MystockComponent },
      {
        path: 'all-stocks',
        component: AllstocksComponent,
      },
      {
        path: 'stocks/:id',
        component: SingleStockComponent,
      },
      {
        path: 'management',
        component: MyBusinessesComponent,
      },
      {
        path: 'businesses',
        component: AllbusinessesComponent,
      },
      {
        path: 'businesses/:id',
        component: SingleStockComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
