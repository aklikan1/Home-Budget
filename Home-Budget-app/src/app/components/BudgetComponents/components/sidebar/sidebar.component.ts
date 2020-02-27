import { Component, OnInit } from "@angular/core";
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES_BUDGET: RouteInfo[] = [
  {
    path: "/budget/dashboard",
    title: "Budget results (CLEAN)",
    icon: "icon-chart-bar-32",
    class: ""
  },
  {
    path: "/budget/editBudget",
    title: "Your budget (CLEAN)",
    icon: "icon-credit-card",
    class: ""
  },
  {
    path: "/budget/icons",
    title: "icons (DELETE)",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/budget/maps",
    title: "Maps (DELETE)",
    icon: "icon-pin",
    class: "" },
  {
    path: "/budget/notifications",
    title: "Notifications (CLEAN)",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/budget/user",
    title: "User Profile (CLEAN)",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/budget/tables",
    title: "History List (CLEAN)",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/budget/typography",
    title: "Typography (DELETE)",
    icon: "icon-align-center",
    class: ""
  }
];

export const ROUTES_AUTH: RouteInfo[] = [
  {
    path: "/budget/login",
    title: "Login (TODO)",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/budget/register",
    title: "Register (TODO)",
    icon: "icon-align-center",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    if(this.tokenStorage.getToken()) {
      this.menuItems = ROUTES_BUDGET.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES_AUTH.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
