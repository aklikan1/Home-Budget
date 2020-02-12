import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MAT_DATE_FORMATS,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule, MatTableModule
} from '@angular/material';
import {MatMomentDateModule, MomentDateModule} from '@angular/material-moment-adapter';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { HistoryComponent } from '../../pages/history/history.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import {MapComponent} from '../../pages/map/map.component';
import {AdminLayoutRoutes} from './admin-layout.routing';
import { EditBudgetComponent } from '../../pages/edit-budget/edit-budget.component';
import {MY_FORMATS} from './constProviders/monthYearDateFormat';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    HistoryComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    EditBudgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MomentDateModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class AdminLayoutModule { }
