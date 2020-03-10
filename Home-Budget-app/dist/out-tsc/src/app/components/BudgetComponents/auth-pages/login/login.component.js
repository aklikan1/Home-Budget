import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthLoginInfo } from '../../../services/auth/login-info';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
let LoginComponent = class LoginComponent {
    constructor(authService, tokenStorage) {
        this.authService = authService;
        this.tokenStorage = tokenStorage;
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
            window.location.replace("budget/dashboard");
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
        window.location.replace("/budget/dashboard");
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [AuthService, TokenStorageService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map