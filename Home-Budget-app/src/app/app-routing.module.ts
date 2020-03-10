import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./components/admin-layout/admin-layout.module#AdminLayoutModule"
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
