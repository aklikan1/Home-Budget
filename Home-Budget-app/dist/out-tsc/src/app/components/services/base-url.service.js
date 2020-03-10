import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
let BaseUrlService = class BaseUrlService {
    constructor() {
        this.baseUrl = window["cfgApiBaseUrl"] + "/api";
    }
};
BaseUrlService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], BaseUrlService);
export { BaseUrlService };
//# sourceMappingURL=base-url.service.js.map