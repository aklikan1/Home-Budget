import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NouisliderModule} from "ng2-nouislider";
import {JwBootstrapSwitchNg2Module} from "jw-bootstrap-switch-ng2";
import { AgmCoreModule } from '@agm/core';
import {ExamplesComponent} from "./examples.component";


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    ProfileComponent,
    ExamplesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NouisliderModule,
    JwBootstrapSwitchNg2Module,
    AgmCoreModule.forRoot({ apiKey: 'YOUR_KEY_HERE' })
  ]
})
export class ExamplesModule { }
