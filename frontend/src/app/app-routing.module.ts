import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {ProfileComponent} from "./profile/profile.component";
import {AppComponent} from "./app.component";
// import {AuthGuard} from "./auth/auth.guard";
import {WelcomeComponent} from "./welcome/welcome.component";
import {CurrenciesComponent} from "./currencies/currencies.component";
import {CurrencyDetailsComponent} from "./currency-details/currency-details.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},

  {
    path: "user",
    component: UserComponent,
    //canActivate: [AuthGuard],

    children: [
      {path: '', redirectTo: '/user/currencies', pathMatch: 'full'},
      {path: "portfolio", component: PortfolioComponent},
      {path: "profile", component: ProfileComponent},
      {path: 'currencies', component: CurrenciesComponent},
      {path: 'currencies/:id', component: CurrencyDetailsComponent}
    ]},



  {path: '', component: WelcomeComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
