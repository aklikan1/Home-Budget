import { __decorate, __metadata, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AuthLoginInfo } from '../../services/auth/login-info';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { APP_BASE_HREF } from '@angular/common';
let LoginComponent = class LoginComponent {
    constructor(authService, tokenStorage, baseHref) {
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.baseHref = baseHref;
        this.form = {};
        this.isLoggedOut = true;
        this.isLoginFailed = false;
        this.errorMessage = '';
        this.roles = [];
        this.data = new Date();
    }
    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedOut = false;
            window.location.replace(this.baseHref + "dashboard");
        }
    }
    onSubmit() {
        this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);
        this.authService.attemptAuth(this.loginInfo).subscribe(data => {
            //console.log(data);
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
            this.tokenStorage.saveUserId(data.id);
            this.isLoginFailed = false;
            this.isLoggedOut = false;
            this.roles = this.tokenStorage.getAuthorities();
            this.redirectToBudgetDashboard();
        }, error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isLoginFailed = true;
        });
    }
    redirectToBudgetDashboard() {
        window.location.replace(this.baseHref + "dashboard");
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __param(2, Inject(APP_BASE_HREF)),
    __metadata("design:paramtypes", [AuthService, TokenStorageService, String])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map