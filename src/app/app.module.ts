import { BrowserModule } from "@angular/platform-browser";
import {NgModule, LOCALE_ID, ErrorHandler} from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TextsComponent } from "./texts/texts.component";
import { ButtonsComponent } from "./buttons/buttons.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { TypographyComponent } from "./typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { AlertsComponent } from "./alerts/alerts.component";
import { AccordionsComponent } from "./accordions/accordions.component";
import { BadgesComponent } from "./badges/badges.component";
import { ProgressbarComponent } from "./progressbar/progressbar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { TooltipsComponent } from "./tooltips/tooltips.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { TabsComponent } from "./tabs/tabs.component";
import { ServicesComponent } from "./services/services.component";
import { LoginComponent } from "./login/login.component";
import { CallbackPipe } from './callback.pipe';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { PricesComponent } from './prices/prices.component';
import { MenuComponent } from './menu/menu.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactComponent } from './contact/contact.component';
import { NotificationComponent } from './_helpers/notification/notification.component';
import {NotificationService} from './_services/notification.service';
import {ImageUploadModule} from 'angular2-image-upload';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {LocalizedDatePipe} from './_helpers/localized.data.pipe';
import {TokenInterceptor} from './auth/token.interceptor';
import {STORAGE_SERVICE, StorageService} from './_services/storage.service';
import { SESSION_STORAGE, StorageServiceModule } from 'angular-webstorage-service';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TextsComponent,
    ButtonsComponent,
    ReviewsComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
    ServicesComponent,
    LoginComponent,
    CallbackPipe,
    PricesComponent,
    MenuComponent,
    PartnersComponent,
    ContactComponent,
    NotificationComponent,
    LocalizedDatePipe,
    PasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    UiSwitchModule,
    ImageUploadModule.forRoot(),
    FileUploadModule,
    StorageServiceModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: STORAGE_SERVICE,
      useExisting: SESSION_STORAGE
    },
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
