import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseUrlService} from '../base-url.service';
import {Budget} from '../../model/budget';
import {BudgetHistory} from '../../model/budgetHistory';
import {GetBudgetBasicNames} from '../../model/getBudgetBasicNames';
import {BudgetDetails} from '../../model/budgetDetails';
import {BasicNamesAndDetailsMoney} from '../../model/basicNamesAndDetailsMoney';
import {User} from '../../model/user';
import {UserCustomDetails} from '../../model/UserCustomDetails';
import {UserPhoto} from '../../model/UserPhoto';

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
  private GET_ALL_INCOME_DETAILS_BY_BUDGET_ID = `${this.GET_ALL_INCOME_DETAILS}\\budget\\`;

  private GET_INCOME_NAMES_MONEY_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\income\\namesMoney\\`;

  //Expenses details
  private GET_ALL_EXPENSES_DETAILS = `${this.baseUrl.baseUrl}\\expensesDetails`;
  private GET_ALL_EXPENSES_DETAILS_BY_BUDGET_ID = `${this.GET_ALL_EXPENSES_DETAILS}\\budget\\`;

  private GET_EXPENSES_NAMES_MONEY_BY_BUDGET_ID = `${this.baseUrl.baseUrl}\\expenses\\namesMoney\\`;

  //User custom details
  private GET_USER_CUSTOM_DETAILS_BY_USER_ID = `${this.baseUrl.baseUrl}\\userDetails\\user\\`;

  //User photo
  private GET_USER_PHOTO_BY_USER_ID = `${this.baseUrl.baseUrl}\\photo\\`;

  //History
  private GET_ALL_HISTORY_BY_USER_ID = `${this.baseUrl.baseUrl}\\history\\user\\`;

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) {}

  getAllBudgetsByUserId(id: string) : Observable<Budget[]> {
    return this.http.get<Budget[]>(this.GET_ALL_BUDGETS_BY_USER_ID+id);
  }

  getUserByUserId(id: any) : Observable<User>{
    return this.http.get<User>(this.GET_USER_BY_USER_ID+id);
  }

  //INCOME DATA

  getMoneyInTimeByBudgetId (id: number) : Observable<number[][]> {
    return this.http.get<number[][]>(this.GET_DIFFERENCES_INCOME_EXPENSES_MONEY_IN_TIME_BY_BUDGET_ID+id);
  }

  getAllIncomeBasicNamesByBudgetId (id: number) : Observable<GetBudgetBasicNames[]> {
    return this.http.get<GetBudgetBasicNames[]>(this.GET_ALL_INCOME_BASIC_NAMES_BY_BUDGET_ID+id);
  }

  getIncomeNamesAndMoneyByBudgetId (id: number) : Observable<BasicNamesAndDetailsMoney[]> {
    return this.http.get<BasicNamesAndDetailsMoney[]>(this.GET_INCOME_NAMES_MONEY_BY_BUDGET_ID+id);
  }

  getAllIncomeDetailsByBudgetId (id: number) : Observable<BudgetDetails[][]> {
    return this.http.get<BudgetDetails[][]>(this.GET_ALL_INCOME_DETAILS_BY_BUDGET_ID+id);
  }

  //EXPENSES DATA

  getAllExpensesBasicNamesByBudgetId (id: number) : Observable<GetBudgetBasicNames[]> {
    return this.http.get<GetBudgetBasicNames[]>(this.GET_ALL_EXPENSES_BASIC_NAMES_BY_BUDGET_ID+id);
  }

  getAllExpensesDetailsByBudgetId (id: number) : Observable<BudgetDetails[][]> {
    return this.http.get<BudgetDetails[][]>(this.GET_ALL_EXPENSES_DETAILS_BY_BUDGET_ID+id);
  }

  getExpensesNamesAndMoneyByBudgetId (id: number) : Observable<BasicNamesAndDetailsMoney[]> {
    return this.http.get<BasicNamesAndDetailsMoney[]>(this.GET_EXPENSES_NAMES_MONEY_BY_BUDGET_ID+id);
  }

  //USER CUSTOM DETAILS DATA
  getUserCustomDetailsByUserId (id: number): Observable<UserCustomDetails> {
    return this.http.get<UserCustomDetails>(this.GET_USER_CUSTOM_DETAILS_BY_USER_ID+id);
  }

  //USER PHOTO DATA
  getUserPhotoByUserId (id: number): Observable<UserPhoto> {
    return this.http.get<UserPhoto>(this.GET_USER_PHOTO_BY_USER_ID+id);
  }

  //HISTORY DATA
  getAllHistoryByUserId (id: number) : Observable<BudgetHistory[]> {
    return this.http.get<BudgetHistory[]>(this.GET_ALL_HISTORY_BY_USER_ID + id);
  }

}

export interface UserGetApi {
  id:number;
  username:string;
  password:string;
  is_active:boolean;
  descriptions:string;
}
