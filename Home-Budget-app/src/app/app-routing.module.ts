import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BudgetComponent} from "./components/budget/budget.component";
import {AdminLayoutComponent} from './components/BudgetComponents/layouts/admin-layout/admin-layout.component';
import {NewBudgetComponent} from "./components/new-budget/new-budget.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {HomeComponent} from "./components/home/home.component";
import {PmComponent} from "./components/pm/pm.component";
import {AdminComponent} from "./components/admin/admin.component";
import {LoginComponent} from "./components/UIComponents/login/login.component";
import {RegisterComponent} from "./components/UIComponents/register/register.component";
import {LandingComponent} from "./examples/landing/landing.component";
import {ProfileComponent} from "./examples/profile/profile.component";
import {NucleoiconsComponent} from "./components/UIComponents/nucleoicons/nucleoicons.component";
import {UIComponentsComponent} from "./components/UIComponents/UIComponents.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  { path:'home', component:HomeComponent },
  //{ path:'user', component:UserComponent },
  { path:'pm', component:PmComponent },
  { path:'admin', component:AdminComponent },
  { path:'login', component:LoginComponent },
  { path:'signup', component:RegisterComponent },
  { path:'budget1', component:BudgetComponent },
  { path:'addBudget', component:NewBudgetComponent },
  //{ path:'', component:BudgetComponent, pathMatch:'full' },
  //{ path:'', redirectTo:'home', pathMatch:'full' },

  { path: '', redirectTo: 'budget', pathMatch: 'full' },
  { path: 'index',                component: UIComponentsComponent },
  { path: 'nucleoicons',          component: NucleoiconsComponent },
  { path: 'examples/landing',     component: LandingComponent },
  { path: 'examples/profile',     component: ProfileComponent },
  //{ path: 'budget', redirectTo: 'budget/dashboard', pathMatch: 'full' },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "budget",
        loadChildren:
          "./components/BudgetComponents/layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },

  { path:'**', component:NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing:false, useHash: true}),
    CommonModule,
    BrowserModule
  ],
  exports: [
  ]
})
export class AppRoutingModule {

}
