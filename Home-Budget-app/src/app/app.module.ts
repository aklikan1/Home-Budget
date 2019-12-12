import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';

import {httpInterceptorProviders} from './components/UIComponents/auth/auth-interceptor';
import {BudgetComponent} from './components/budget/budget.component';
import {BudgetComponentsModule} from './components/BudgetComponents/budget-components.module';
import {NewBudgetComponent} from './components/new-budget/new-budget.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PmComponent} from './components/pm/pm.component';
import {UIComponentsModule} from './components/UIComponents/UIComponents.module';
import {UserComponent} from './components/user/user.component';
import {ExamplesModule} from './examples/examples.module';
import {BudgetNavbarComponent} from './shared/Navbar/budget-navbar/budget-navbar.component';
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
    BudgetNavbarComponent
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
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
