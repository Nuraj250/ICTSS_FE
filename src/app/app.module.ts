import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { ConfirmationModelComponent } from './component/util/confirmation-model/confirmation-model.component';
import { TablePaginationComponent } from './component/util/table-pagination/table-pagination.component';
import { ValidationMessageComponent } from './component/util/validation-message/validation-message.component';

import {
  AvatarModule,
  BadgeModule,ModalModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SpinnerModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserComponent } from './component/manage-user/add-user/add-user.component';
import { ViewUserComponent } from './component/manage-user/view-user/view-user.component';
import { ViewPlaygroundComponent } from './component/manage-playground/view-playground/view-playground.component';
import { AddPlayerComponent } from './component/manage-player/add-player/add-player.component';
import { ViewPlayerComponent } from './component/manage-player/view-player/view-player.component';

import { LoginComponent } from './component/login/login.component';
import { AddPlaygroundComponent } from './component/manage-playground/add-playground/add-playground.component';
import { AddTeamComponent } from './component/manage-team/add-team/add-team.component';
import { ViewTeamComponent } from './component/manage-team/view-team/view-team.component';
import { PredictComponent } from './component/predict/predict.component';
import { AuthGuard } from './common/auth.guard';
import {ErrorInterceptor, JwtInterceptor} from "./common";
import { UserService } from './service/user.service';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

export function initializeApp(userService: UserService): any {
  return (): Promise<void> => userService.loadUserData();
}

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ConfirmationModelComponent,
    TablePaginationComponent,
    ValidationMessageComponent,
    AddUserComponent,
    ViewUserComponent,
    ViewPlaygroundComponent,
    AddPlaygroundComponent,
    ViewPlayerComponent,
    AddPlayerComponent,
    LoginComponent,
    AddTeamComponent,
    ViewTeamComponent,
    PredictComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    ModalModule,
    MatDialogModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    SpinnerModule,
    PaginationModule,
    MatCheckboxModule,
    FormModule,
    UtilitiesModule,
    TabsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
