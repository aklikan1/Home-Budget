import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { TokenStorageService } from '../../../auth/token-storage.service';
let AdminLayoutComponent = class AdminLayoutComponent {
    constructor(tokenStorage) {
        this.tokenStorage = tokenStorage;
        this.sidebarColor = "red";
    }
    changeSidebarColor(color) {
        var sidebar = document.getElementsByClassName('sidebar')[0];
        var mainPanel = document.getElementsByClassName('main-panel')[0];
        this.sidebarColor = color;
        if (sidebar != undefined) {
            sidebar.setAttribute('data', color);
        }
        if (mainPanel != undefined) {
            mainPanel.setAttribute('data', color);
        }
    }
    ngOnInit() {
        if (!this.tokenStorage.getToken() && location.pathname != "/budget/login" && location.pathname != "/budget/register") {
            location.replace("/budget/login");
        }
    }
};
AdminLayoutComponent = __decorate([
    Component({
        selector: "app-admin-layout",
        templateUrl: "./admin-layout.component.html",
        styleUrls: ["./admin-layout.component.scss"]
    }),
    __metadata("design:paramtypes", [TokenStorageService])
], AdminLayoutComponent);
export { AdminLayoutComponent };
//# sourceMappingURL=admin-layout.component.js.map