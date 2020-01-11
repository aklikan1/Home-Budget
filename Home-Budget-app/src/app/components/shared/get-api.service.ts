import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseUrlService} from '../../shared/base-url.service';
import {Budget} from "../BudgetComponents/pages/dashboard/model/budget";
import {GetBudgetBasicNames} from '../BudgetComponents/pages/dashboard/model/getBudgetBasicNames';
import {BudgetDetails} from '../BudgetComponents/pages/dashboard/model/budgetDetails';
import {BasicNamesAndDetailsMoney} from '../BudgetComponents/pages/dashboard/model/basicNamesAndDetailsMoney';
import {User} from '../BudgetComponents/pages/dashboard/model/user';
import {BudgetViewModel} from "../new-budget/new-budget.component";

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  private GET_ALL_BUDGET = `${this.baseUrl.baseUrl}\\budget`;
  private GET_ALL_BUDGETS_BY_USER_ID = `${this.GET_ALL_BUDGET}\\user\\`;
  private GET_USERS = `${this.baseUrl.baseUrl}\\user`;
  private GET_USER_BY_USER_ID = `${this.GET_USERS}\\`;

  private GET_DIFFERENCES_INCOME_EXPENSES_MONEY_IN_TIME_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\incomeAndExpenses\\performance\\budget\\`;

  //Income basic names
  private GET_ALL_INCOME_BASIC_NAMES = `${this.baseUrl.baseUrl}\\incomeBasicNames`;
  private GET_ALL_INCOME_BASIC_NAMES_BY_BUDGET_ID = `${this.GET_ALL_INCOME_BASIC_NAMES}\\budget\\`;

  //Expenses basic names
  private GET_ALL_EXPENSES_BASIC_NAMES = `${this.baseUrl.baseUrl}\\expensesBasicNames`;
  private GET_ALL_EXPENSES_BASIC_NAMES_BY_BUDGET_ID = `${this.GET_ALL_EXPENSES_BASIC_NAMES}\\budget\\`;

  //Income details
  private GET_ALL_INCOME_DETAILS = `${this.baseUrl.baseUrl}\\incomeDetails`;
  private GET_ALL_INCOME_DETAILS_BY_BASIC_NAMES_ID = `${this.GET_ALL_INCOME_DETAILS}\\incomeNames\\`;
  private GET_ALL_INCOME_DETAILS_BY_BUDGET_ID = `${this.GET_ALL_INCOME_DETAILS}\\budget\\`;

  private GET_INCOME_NAMES_MONEY_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\income\\namesMoney\\`;

  //Expenses details
  private GET_ALL_EXPENSES_DETAILS = `${this.baseUrl.baseUrl}\\expensesDetails`;
  private GET_ALL_EXPENSES_DETAILS_BY_BUDGET_ID = `${this.GET_ALL_EXPENSES_DETAILS}\\budget\\`;

  private GET_EXPENSES_NAMES_MONEY_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\expenses\\namesMoney\\`;

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) {}

  getAllBudget() : Observable<Budget[]> {
    return this.http.get<Budget[]>(this.GET_ALL_BUDGET);
  }

  getAllBudgetsByUserId(id: string) : Observable<Budget[]> {
    return this.http.get<Budget[]>(this.GET_ALL_BUDGETS_BY_USER_ID+id);
  }

  addNewBudget(budget: BudgetViewModel) : Observable<any> {
    return this.http.post(this.GET_ALL_BUDGET, budget);
  }

  getUser() : Observable<UserGetApi[]> {
    return this.http.get<UserGetApi[]>(this.GET_USERS);
  }

  getUserByUserId(id: any) : Observable<User>{
    return this.http.get<User>(this.GET_USER_BY_USER_ID+id);
  }

  //INCOME URLS

  getMoneyInTimeByBudgetId (id: number) : Observable<number[][]> {
    return this.http.get<number[][]>(this.GET_DIFFERENCES_INCOME_EXPENSES_MONEY_IN_TIME_BY_BUDGET_ID+id);
  }

  getAllIncomeBasicNamesByBudgetId (id: number) : Observable<GetBudgetBasicNames[]> {
    return this.http.get<GetBudgetBasicNames[]>(this.GET_ALL_INCOME_BASIC_NAMES_BY_BUDGET_ID+id);
  }

  getIncomeNamesAndMoneyByBudgetId (id: number) : Observable<BasicNamesAndDetailsMoney[]> {
    return this.http.get<BasicNamesAndDetailsMoney[]>(this.GET_INCOME_NAMES_MONEY_BY_BUDGET_ID+id);
  }

  getAllIncomeDetails(): Observable<BudgetDetails[]> {
    return this.http.get<BudgetDetails[]>(this.GET_ALL_INCOME_DETAILS);
  }

  getAllIncomeDetailsByBasicNamesId (id: number) : Observable<BudgetDetails[]> {
    return this.http.get<BudgetDetails[]>(this.GET_ALL_INCOME_DETAILS_BY_BASIC_NAMES_ID+id);
  }

  getAllIncomeDetailsByBudgetId (id: number) : Observable<BudgetDetails[][]> {
    return this.http.get<BudgetDetails[][]>(this.GET_ALL_INCOME_DETAILS_BY_BUDGET_ID+id);
  }

  //EXPENSES URLS

  getAllExpensesBasicNamesByBudgetId (id: number) : Observable<GetBudgetBasicNames[]> {
    return this.http.get<GetBudgetBasicNames[]>(this.GET_ALL_EXPENSES_BASIC_NAMES_BY_BUDGET_ID+id);
  }

  getAllExpensesDetails(): Observable<BudgetDetails[]> {
    return this.http.get<BudgetDetails[]>(this.GET_ALL_EXPENSES_DETAILS);
  }

  getAllExpensesDetailsByBudgetId (id: number) : Observable<BudgetDetails[][]> {
    return this.http.get<BudgetDetails[][]>(this.GET_ALL_EXPENSES_DETAILS_BY_BUDGET_ID+id);
  }

  getExpensesNamesAndMoneyByBudgetId (id: number) : Observable<BasicNamesAndDetailsMoney[]> {
    return this.http.get<BasicNamesAndDetailsMoney[]>(this.GET_EXPENSES_NAMES_MONEY_BY_BUDGET_ID+id);
  }

}

export interface UserGetApi {
  id:number;
  username:string;
  password:string;
  is_active:boolean;
  descriptions:string;
}
