import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import {CurrenciesComponent} from "./currencies/currencies.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CurrencyDetailsComponent} from "./currency-details/currency-details.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/AuthInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    PortfolioComponent,
    ProfileComponent,
    AutoFocusDirective,

    CurrenciesComponent,
    WelcomeComponent,
    NotFoundComponent,
    CurrencyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
