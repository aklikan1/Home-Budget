import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../authentication/login/login.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EditBudgetComponent } from '../../pages/edit-budget/edit-budget.component';
import { HistoryComponent } from '../../pages/history/history.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapComponent } from '../../pages/map/map.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UserComponent } from '../../pages/user/user.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MY_FORMATS } from './constProviders/monthYearDateFormat';
import { RegisterComponent } from '../../authentication/register/register.component';
let AdminLayoutModule = class AdminLayoutModule {
};
AdminLayoutModule = __decorate([
    NgModule({
        declarations: [
            DashboardComponent,
            UserComponent,
            HistoryComponent,
            IconsComponent,
            TypographyComponent,
            NotificationsComponent,
            MapComponent,
            EditBudgetComponent,
            LoginComponent,
            RegisterComponent
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
            { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
        ]
    })
], AdminLayoutModule);
export { AdminLayoutModule };
//# sourceMappingURL=admin-layout.module.js.map