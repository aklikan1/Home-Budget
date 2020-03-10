import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from '../base-url.service';
let DeleteApiService = class DeleteApiService {
    constructor(baseUrl, http) {
        this.baseUrl = baseUrl;
        this.http = http;
        //Budget URLs
        this.DELETE_BUDGET_BY_ID = `${this.baseUrl.baseUrl}\\budget\\`;
        //Income URLs
        this.DELETE_INCOME_BASIC_NAME_BY_ID = `${this.baseUrl.baseUrl}\\incomeBasicNames\\`;
        this.DELETE_INCOME_DETAIL_BY_ID = `${this.baseUrl.baseUrl}\\incomeDetails\\`;
        //Expenses URLs
        this.DELETE_EXPENSES_BASIC_NAME_BY_ID = `${this.baseUrl.baseUrl}\\expensesBasicNames\\`;
        this.DELETE_EXPENSES_DETAIL_BY_ID = `${this.baseUrl.baseUrl}\\expensesDetails\\`;
    }
    // <-- FUNCTIONS -->
    //Budget
    deleteBudgetById(id) {
        return this.http.delete(this.DELETE_BUDGET_BY_ID + id);
    }
    //Income basic names
    deleteIncomeBasicNameById(id) {
        return this.http.delete(this.DELETE_INCOME_BASIC_NAME_BY_ID + id);
    }
    //Expenses basic names
    deleteExpensesBasicNameById(id) {
        return this.http.delete(this.DELETE_EXPENSES_BASIC_NAME_BY_ID + id);
    }
    //Income details
    deleteIncomeDetailById(id) {
        return this.http.delete(this.DELETE_INCOME_DETAIL_BY_ID + id);
    }
    //Expenses details
    deleteExpensesDetailById(id) {
        return this.http.delete(this.DELETE_EXPENSES_DETAIL_BY_ID + id);
    }
};
DeleteApiService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [BaseUrlService, HttpClient])
], DeleteApiService);
export { DeleteApiService };
//# sourceMappingURL=delete-api.service.js.map