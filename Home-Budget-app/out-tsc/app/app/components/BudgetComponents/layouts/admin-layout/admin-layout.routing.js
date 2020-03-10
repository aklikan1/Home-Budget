import { LoginComponent } from '../../authentication/login/login.component';
import { RegisterComponent } from '../../authentication/register/register.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EditBudgetComponent } from '../../pages/edit-budget/edit-budget.component';
import { HistoryComponent } from '../../pages/history/history.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapComponent } from '../../pages/map/map.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UserComponent } from '../../pages/user/user.component';
export const AdminLayoutRoutes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "editBudget", component: EditBudgetComponent },
    { path: "icons", component: IconsComponent },
    { path: "maps", component: MapComponent },
    { path: "notifications", component: NotificationsComponent },
    { path: "user", component: UserComponent },
    { path: "tables", component: HistoryComponent },
    { path: "typography", component: TypographyComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
];
//# sourceMappingURL=admin-layout.routing.js.map