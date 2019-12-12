import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicelementsComponent} from './basicelements/basicelements.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from './login/login.component';
import {NgbdModalBasic} from './modal/modal.component';
import {NotificationComponent} from './notification/notification.component';
import {NucleoiconsComponent} from './nucleoicons/nucleoicons.component';
import {RegisterComponent} from './register/register.component';
import {TypographyComponent} from './typography/typography.component';
import {UIComponentsComponent} from "./UIComponents.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {NouisliderModule} from "ng2-nouislider";
import {JwBootstrapSwitchNg2Module} from "jw-bootstrap-switch-ng2";
import {NavigationComponent} from "../navigation/navigation.component";

@NgModule({
  declarations: [
    BasicelementsComponent,
    NgbdModalBasic,
    NotificationComponent,
    NucleoiconsComponent,
    TypographyComponent,
    UIComponentsComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    JwBootstrapSwitchNg2Module
  ],
  exports:[ UIComponentsComponent ]
})
export class UIComponentsModule { }
