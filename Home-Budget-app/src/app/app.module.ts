import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy, PlatformLocation} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {httpInterceptorProviders} from './components/services/auth/auth-interceptor';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {AdminLayoutModule} from './components/admin-layout/admin-layout.module';
import {ComponentsModule} from './components/navigation/components.module';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    AdminLayoutModule,
    ComponentsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
