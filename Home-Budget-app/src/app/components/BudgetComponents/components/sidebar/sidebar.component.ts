import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/budget/dashboard",
    title: "Budget results (CLEAN)",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-bar-32",
    class: ""
  },
  {
    path: "/budget/editBudget",
    title: "Edit budget (DOING)",
    rtlTitle: "",
    icon: "icon-credit-card",
    class: ""
  },
  {
    path: "/budget/icons",
    title: "icons",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/budget/maps",
    title: "Maps",
    rtlTitle: "خرائط",
    icon: "icon-pin",
    class: "" },
  {
    path: "/budget/notifications",
    title: "Notifications",
    rtlTitle: "إخطارات",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/budget/user",
    title: "User Profile (TODO)",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/budget/tables",
    title: "History List (TODO)",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/budget/typography",
    title: "Typography",
    rtlTitle: "طباعة",
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

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
