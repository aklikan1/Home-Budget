import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseUrlService } from '../base-url.service';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let AuthService = class AuthService {
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.loginUrl = `${this.baseUrl.baseUrl}\\auth\\signin`;
        this.signUpUrl = `${this.baseUrl.baseUrl}\\auth\\signup`;
    }
    attemptAuth(credentials) {
        return this.http.post(this.loginUrl, credentials, httpOptions);
    }
    signUp(info) {
        return this.http.post(this.signUpUrl, info, httpOptions);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient, BaseUrlService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map