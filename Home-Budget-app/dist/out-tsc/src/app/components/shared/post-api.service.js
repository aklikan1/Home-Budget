import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from '../../shared/base-url.service';
let PostApiService = class PostApiService {
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        //Budget
        this.POST_BUDGET_ADD_BUDGET = `${this.baseUrl.baseUrl}\\budget`;
        //Income basic names
        this.POST_INCOME_BASIC_NAMES = `${this.baseUrl.baseUrl}\\incomeBasicNames`;
        //Expenses basic names
        this.POST_EXPENSES_BASIC_NAMES = `${this.baseUrl.baseUrl}\\expensesBasicNames`;
        //Income details
        this.POST_INCOME_DETAILS = `${this.baseUrl.baseUrl}\\incomeDetails`;
        //Expenses details
        this.POST_EXPENSES_DETAILS = `${this.baseUrl.baseUrl}\\expensesDetails`;
        //UserCustomDetails
        this.POST_USER_CUSTOM_DETAILS = `${this.baseUrl.baseUrl}\\userDetails`;
        //User photo
        this.POST_USER_PHOTO = `${this.baseUrl.baseUrl}\\photo\\upload`;
    }
    //Budget data
    postAddOrChangeBudget(budget) {
        return this.http.post(this.POST_BUDGET_ADD_BUDGET, budget);
    }
    //Income data
    postIncomeBasicNames(incomeBasicNames) {
        return this.http.post(this.POST_INCOME_BASIC_NAMES, incomeBasicNames);
    }
    postIncomeBudgetDetails(incomeDetails) {
        return this.http.post(this.POST_INCOME_DETAILS, incomeDetails);
    }
    //Expenses data
    postExpensesBasicNames(expensesBasicNames) {
        return this.http.post(this.POST_EXPENSES_BASIC_NAMES, expensesBasicNames);
    }
    postExpensesBudgetDetails(expensesDetails) {
        return this.http.post(this.POST_EXPENSES_DETAILS, expensesDetails);
    }
    //User custom details data
    postUserCustomDetails(userCustomDetails) {
        return this.http.post(this.POST_USER_CUSTOM_DETAILS, userCustomDetails);
    }
    //Photo data
    postUserPhoto(uploadData) {
        return this.http.post(this.POST_USER_PHOTO, uploadData);
    }
};
PostApiService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient, BaseUrlService])
], PostApiService);
export { PostApiService };
//# sourceMappingURL=post-api.service.js.map