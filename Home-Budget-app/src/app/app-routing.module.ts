import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BudgetComponent} from "./budget/budget.component";
import {NewBudgetComponent} from "./new-budget/new-budget.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {PmComponent} from "./pm/pm.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'user',
    component:UserComponent
  },
  {
    path:'pm',
    component:PmComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'auth/login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:RegisterComponent
  },
  {
    path:'budget',
    component:BudgetComponent
  },
  {
    path:'addBudget',
    component:NewBudgetComponent
  },
  /*
  {
    path:'',
    component:BudgetComponent,
    pathMatch:'full'
  },
   */
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
