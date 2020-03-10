import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../base-url.service';
let GetApiService = class GetApiService {
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.GET_ALL_BUDGET = `${this.baseUrl.baseUrl}\\budget`;
        this.GET_ALL_BUDGETS_BY_USER_ID = `${this.GET_ALL_BUDGET}\\user\\`;
        this.GET_USERS = `${this.baseUrl.baseUrl}\\user`;
        this.GET_USER_BY_USER_ID = `${this.GET_USERS}\\`;
        this.GET_DIFFERENCES_INCOME_EXPENSES_MONEY_IN_TIME_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\incomeAndExpenses\\performance\\budget\\`;
        //Income basic names
        this.GET_ALL_INCOME_BASIC_NAMES = `${this.baseUrl.baseUrl}\\incomeBasicNames`;
        this.GET_ALL_INCOME_BASIC_NAMES_BY_BUDGET_ID = `${this.GET_ALL_INCOME_BASIC_NAMES}\\budget\\`;
        //Expenses basic names
        this.GET_ALL_EXPENSES_BASIC_NAMES = `${this.baseUrl.baseUrl}\\expensesBasicNames`;
        this.GET_ALL_EXPENSES_BASIC_NAMES_BY_BUDGET_ID = `${this.GET_ALL_EXPENSES_BASIC_NAMES}\\budget\\`;
        //Income details
        this.GET_ALL_INCOME_DETAILS = `${this.baseUrl.baseUrl}\\incomeDetails`;
        this.GET_ALL_INCOME_DETAILS_BY_BUDGET_ID = `${this.GET_ALL_INCOME_DETAILS}\\budget\\`;
        this.GET_INCOME_NAMES_MONEY_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\income\\namesMoney\\`;
        //Expenses details
        this.GET_ALL_EXPENSES_DETAILS = `${this.baseUrl.baseUrl}\\expensesDetails`;
        this.GET_ALL_EXPENSES_DETAILS_BY_BUDGET_ID = `${this.GET_ALL_EXPENSES_DETAILS}\\budget\\`;
        this.GET_EXPENSES_NAMES_MONEY_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\expenses\\namesMoney\\`;
        //User custom details
        this.GET_USER_CUSTOM_DETAILS_BY_USER_ID = `${this.baseUrl.baseUrl}\\userDetails\\user\\`;
        //User photo
        this.GET_USER_PHOTO_BY_USER_ID = `${this.baseUrl.baseUrl}\\photo\\`;
        //History
        this.GET_ALL_HISTORY_BY_USER_ID = `${this.baseUrl.baseUrl}\\history\\user\\`;
    }
    getAllBudgetsByUserId(id) {
        return this.http.get(this.GET_ALL_BUDGETS_BY_USER_ID + id);
    }
    getUserByUserId(id) {
        return this.http.get(this.GET_USER_BY_USER_ID + id);
    }
    //INCOME DATA
    getMoneyInTimeByBudgetId(id) {
        return this.http.get(this.GET_DIFFERENCES_INCOME_EXPENSES_MONEY_IN_TIME_BY_BUDGET_ID + id);
    }
    getAllIncomeBasicNamesByBudgetId(id) {
        return this.http.get(this.GET_ALL_INCOME_BASIC_NAMES_BY_BUDGET_ID + id);
    }
    getIncomeNamesAndMoneyByBudgetId(id) {
        return this.http.get(this.GET_INCOME_NAMES_MONEY_BY_BUDGET_ID + id);
    }
    getAllIncomeDetailsByBudgetId(id) {
        return this.http.get(this.GET_ALL_INCOME_DETAILS_BY_BUDGET_ID + id);
    }
    //EXPENSES DATA
    getAllExpensesBasicNamesByBudgetId(id) {
        return this.http.get(this.GET_ALL_EXPENSES_BASIC_NAMES_BY_BUDGET_ID + id);
    }
    getAllExpensesDetailsByBudgetId(id) {
        return this.http.get(this.GET_ALL_EXPENSES_DETAILS_BY_BUDGET_ID + id);
    }
    getExpensesNamesAndMoneyByBudgetId(id) {
        return this.http.get(this.GET_EXPENSES_NAMES_MONEY_BY_BUDGET_ID + id);
    }
    //USER CUSTOM DETAILS DATA
    getUserCustomDetailsByUserId(id) {
        return this.http.get(this.GET_USER_CUSTOM_DETAILS_BY_USER_ID + id);
    }
    //USER PHOTO DATA
    getUserPhotoByUserId(id) {
        return this.http.get(this.GET_USER_PHOTO_BY_USER_ID + id);
    }
    //HISTORY DATA
    getAllHistoryByUserId(id) {
        return this.http.get(this.GET_ALL_HISTORY_BY_USER_ID + id);
    }
};
GetApiService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient, BaseUrlService])
], GetApiService);
export { GetApiService };
//# sourceMappingURL=get-api.service.js.map