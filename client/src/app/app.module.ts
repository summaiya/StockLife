import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Configure firebase.
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Importing the environment config file for the firebase configuration.
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AllstocksComponent } from './allstocks/allstocks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageComponent } from './components/image/image.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MystockComponent } from './mystock/mystock.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SingleStockComponent } from './single-stock/single-stock.component';
import { ChartModule, LineSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AllstocksComponent,
    DashboardComponent,
    ImageComponent,
    HeaderComponent,
    NavbarComponent,
    MystockComponent,
    DashboardHomeComponent,
    SingleStockComponent,
  ],
  imports: [
    ChartModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [ LineSeriesService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
