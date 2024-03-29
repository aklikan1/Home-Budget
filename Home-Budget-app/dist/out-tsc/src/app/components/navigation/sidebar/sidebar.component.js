import { __decorate, __metadata } from "tslib";
import { Component } from "@angular/core";
import { TokenStorageService } from '../../services/auth/token-storage.service';
export const ROUTES_BUDGET = [
    {
        path: "/homebudget/dashboard",
        title: "Budget results",
        icon: "icon-chart-bar-32",
        class: ""
    },
    {
        path: "/homebudget/editBudget",
        title: "Your budget",
        icon: "icon-credit-card",
        class: ""
    },
    {
        path: "/homebudget/tables",
        title: "History",
        icon: "icon-puzzle-10",
        class: ""
    }
];
export const ROUTES_AUTH = [
    {
        path: "/homebudget/login",
        title: "Login",
        icon: "icon-align-center",
        class: ""
    },
    {
        path: "/homebudget/register",
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