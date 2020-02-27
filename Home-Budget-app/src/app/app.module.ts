import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MomentDateModule} from '@angular/material-moment-adapter';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {ROUTES_AUTH, SidebarComponent} from './components/BudgetComponents/components/sidebar/sidebar.component';
import {AdminLayoutRoutes} from './components/BudgetComponents/layouts/admin-layout/admin-layout.routing';

import {httpInterceptorProviders} from './components/UIComponents/auth/auth-interceptor';
import {BudgetComponent} from './components/budget/budget.component';
import {BudgetComponentsModule} from './components/BudgetComponents/budget-components.module';
import {NewBudgetComponent} from './components/new-budget/new-budget.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PmComponent} from './components/pm/pm.component';
import {UIComponentsModule} from './components/UIComponents/UIComponents.module';
import {UserComponent} from './components/user/user.component';
import {ExamplesModule} from './examples/examples.module';
import {UiNavbarComponent} from './shared/Navbar/ui-navbar/ui-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    NewBudgetComponent,
    NotFoundComponent,
    UserComponent,
    PmComponent,
    AdminComponent,
    UiNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    UIComponentsModule,
    ExamplesModule,
    RouterModule,
    BudgetComponentsModule
  ],
  providers: [
    httpInterceptorProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
