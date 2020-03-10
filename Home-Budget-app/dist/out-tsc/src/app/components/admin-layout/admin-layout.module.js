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
import { LoginComponent } from '../auth-pages/login/login.component';
import { DashboardComponent } from '../budget-pages/dashboard/dashboard.component';
import { EditBudgetComponent } from '../budget-pages/edit-budget/edit-budget.component';
import { HistoryComponent } from '../budget-pages/history/history.component';
import { UserComponent } from '../budget-pages/user/user.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MY_FORMATS } from './constProviders/monthYearDateFormat';
import { RegisterComponent } from '../auth-pages/register/register.component';
let AdminLayoutModule = class AdminLayoutModule {
};
AdminLayoutModule = __decorate([
    NgModule({
        declarations: [
            DashboardComponent,
            UserComponent,
            HistoryComponent,
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