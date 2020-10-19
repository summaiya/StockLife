import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule ,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { SingleStockComponent } from './single-stock/single-stock.component';
import { ChartModule, LineSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts';
// spinner module added to overcome data delays
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptors';
import { AllbusinessesComponent } from './allbusinesses/allbusinesses.component';
import { MyBusinessesComponent } from './my-businesses/my-businesses.component';
import { SingleBusinessComponent } from './single-business/single-business.component';
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
    // SpinnerComponent
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
  providers: [ LineSeriesService, CategoryService,
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
