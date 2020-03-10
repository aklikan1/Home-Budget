import { LoginComponent } from '../auth-pages/login/login.component';
import { RegisterComponent } from '../auth-pages/register/register.component';
import { DashboardComponent } from '../budget-pages/dashboard/dashboard.component';
import { EditBudgetComponent } from '../budget-pages/edit-budget/edit-budget.component';
import { HistoryComponent } from '../budget-pages/history/history.component';
import { UserComponent } from '../budget-pages/user/user.component';
export const AdminLayoutRoutes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "editBudget", component: EditBudgetComponent },
    { path: "user", component: UserComponent },
    { path: "tables", component: HistoryComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
];
//# sourceMappingURL=admin-layout.routing.js.map