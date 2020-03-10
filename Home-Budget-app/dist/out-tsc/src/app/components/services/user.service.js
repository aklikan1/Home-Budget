import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.userUrl = 'http://localhost:8080/api/test/user';
        this.pmUrl = 'http://localhost:8080/api/test/pm';
        this.adminUrl = 'http://localhost:8080/api/test/admin';
    }
    getUserBoard() {
        return this.http.get(this.userUrl, { responseType: 'text' });
    }
    getPMBoard() {
        return this.http.get(this.pmUrl, { responseType: 'text' });
    }
    getAdminBoard() {
        return this.http.get(this.adminUrl, { responseType: 'text' });
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map