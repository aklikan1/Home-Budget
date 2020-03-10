import { __decorate, __metadata } from "tslib";
import { Component } from "@angular/core";
import { TokenStorageService } from '../../../services/auth/token-storage.service';
export const ROUTES_BUDGET = [
    {
        path: "/budget/dashboard",
        title: "Budget results",
        icon: "icon-chart-bar-32",
        class: ""
    },
    {
        path: "/budget/editBudget",
        title: "Your budget",
        icon: "icon-credit-card",
        class: ""
    },
    {
        path: "/budget/notifications",
        title: "Notifications (Clean)",
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
export const ROUTES_AUTH = [
    {
        path: "/budget/login",
        title: "Login",
        icon: "icon-align-center",
        class: ""
    },
    {
        path: "/budget/register",
        title: "Register",
        icon: "icon-align-center",
        class: ""
    }
];
let SidebarComponent = class SidebarComponent {
    constructor(tokenStorage) {
        this.tokenStorage = tokenStorage;
    }
    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.menuItems = ROUTES_BUDGET.filter(menuItem => menuItem);
        }
        else {
            this.menuItems = ROUTES_AUTH.filter(menuItem => menuItem);
        }
    }
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    }
};
SidebarComponent = __decorate([
    Component({
        selector: "app-sidebar",
        templateUrl: "./sidebar.component.html",
        styleUrls: ["./sidebar.component.scss"]
    }),
    __metadata("design:paramtypes", [TokenStorageService])
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map