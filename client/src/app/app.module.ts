import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService, ChartModule, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AllbusinessesComponent } from './allbusinesses/allbusinesses.component';
import { AllstocksComponent } from './allstocks/allstocks.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingInterceptor } from './interceptors/loading.interceptors';
import { LoginComponent } from './login/login.component';
import { MyBusinessesComponent } from './my-businesses/my-businesses.component';
import { MystockComponent } from './mystock/mystock.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SingleBusinessComponent } from './single-business/single-business.component';
import { SingleStockComponent } from './single-stock/single-stock.component';
import { SpinnerComponent } from './ui_spinner/spinner/spinner.component';

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
    SingleStockComponent,
    AllbusinessesComponent,
    MyBusinessesComponent,
    SingleBusinessComponent,
    SpinnerComponent
  ],
  imports: [
    ChartModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    LineSeriesService, CategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
