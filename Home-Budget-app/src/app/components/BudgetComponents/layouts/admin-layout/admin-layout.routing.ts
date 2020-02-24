import { Routes } from "@angular/router";
import {AuthComponent} from '../../authentication/auth.component';

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { EditBudgetComponent } from '../../pages/edit-budget/edit-budget.component';
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { HistoryComponent } from "../../pages/history/history.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "editBudget", component: EditBudgetComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: HistoryComponent },
  { path: "typography", component: TypographyComponent },
  { path: "", component: AuthComponent}
];
