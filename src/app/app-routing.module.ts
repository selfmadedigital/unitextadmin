import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { TextsComponent } from "./texts/texts.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { ServicesComponent } from "./services/services.component";
import { LoginComponent } from "./login/login.component";
import { PricesComponent } from './prices/prices.component';
import { MenuComponent } from './menu/menu.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactComponent } from './contact/contact.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: "dashboard", pathMatch: "full"},
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "texts", component: TextsComponent, canActivate: [AuthGuard] },
  { path: "reviews", component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: "services", component: ServicesComponent, canActivate: [AuthGuard] },
  { path: "prices", component: PricesComponent, canActivate: [AuthGuard] },
  { path: "menu", component: MenuComponent, canActivate: [AuthGuard] },
  { path: "partners", component: PartnersComponent, canActivate: [AuthGuard] },
  { path: "contact", component: ContactComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
