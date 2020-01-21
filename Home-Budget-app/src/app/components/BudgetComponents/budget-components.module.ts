import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {MomentDateModule} from '@angular/material-moment-adapter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from '../../app-routing.module';
import {AppComponent} from '../../app.component';
import {ComponentsModule} from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AdminLayoutModule
  ],
  exports: [

  ]
})
export class BudgetComponentsModule { }
