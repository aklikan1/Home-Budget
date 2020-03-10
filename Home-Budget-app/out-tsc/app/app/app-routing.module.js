import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
const routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: "./components/admin-layout/admin-layout.module#AdminLayoutModule"
            }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { enableTracing: false, useHash: true }),
            CommonModule,
            BrowserModule
        ],
        exports: []
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map