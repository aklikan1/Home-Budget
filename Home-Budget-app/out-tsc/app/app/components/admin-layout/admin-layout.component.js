import { __decorate, __metadata, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { APP_BASE_HREF } from '@angular/common';
let AdminLayoutComponent = class AdminLayoutComponent {
    constructor(tokenStorage, baseHref) {
        this.tokenStorage = tokenStorage;
        this.baseHref = baseHref;
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
        if (!this.tokenStorage.getToken() && location.pathname != (this.baseHref + "login") && location.pathname != (this.baseHref + "register")) {
            location.replace(this.baseHref + "login");
        }
    }
};
AdminLayoutComponent = __decorate([
    Component({
        selector: "app-admin-layout",
        templateUrl: "./admin-layout.component.html",
        styleUrls: ["./admin-layout.component.scss"]
    }),
    __param(1, Inject(APP_BASE_HREF)),
    __metadata("design:paramtypes", [TokenStorageService, String])
], AdminLayoutComponent);
export { AdminLayoutComponent };
//# sourceMappingURL=admin-layout.component.js.map