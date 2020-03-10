import { Component, OnInit } from "@angular/core";
import {TokenStorageService} from '../../services/auth/token-storage.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES_BUDGET: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Budget results",
    icon: "icon-chart-bar-32",
    class: ""
  },
  {
    path: "/editBudget",
    title: "Your budget",
    icon: "icon-credit-card",
    class: ""
  },
  {
    path: "/tables",
    title: "History",
    icon: "icon-puzzle-10",
    class: ""
  }
];

export const ROUTES_AUTH: RouteInfo[] = [
  {
    path: "/login",
    title: "Login",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/register",
    title: "Register",
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
