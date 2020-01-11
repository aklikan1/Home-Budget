import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseUrlService} from '../../shared/base-url.service';
import {Budget} from '../BudgetComponents/pages/dashboard/model/budget';
import {BudgetDetails} from '../BudgetComponents/pages/dashboard/model/budgetDetails';
import {PostBudgetBasicNames} from '../BudgetComponents/pages/dashboard/model/postBudgetBasicNames';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  //Budget
  private POST_BUDGET_ADD_BUDGET = `${this.baseUrl.baseUrl}\\budget`;

  //Income basic names
  private POST_INCOME_BASIC_NAMES = `${this.baseUrl.baseUrl}\\incomeBasicNames`;

  //Expenses basic names
  private POST_EXPENSES_BASIC_NAMES = `${this.baseUrl.baseUrl}\\expensesBasicNames`;

  //Income details
  private POST_INCOME_DETAILS = `${this.baseUrl.baseUrl}\\incomeDetails`;

  //Expenses details
  private POST_EXPENSES_DETAILS = `${this.baseUrl.baseUrl}\\expensesDetails`;

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) {}

  //Budget URLs
  postAddOrChangeBudget (budget: Budget): Observable<any> {
    return this.http.post(this.POST_BUDGET_ADD_BUDGET, budget);
  }

  //Income URLs
  postIncomeBasicNames(incomeBasicNames: PostBudgetBasicNames): Observable<any> {
    return this.http.post(this.POST_INCOME_BASIC_NAMES, incomeBasicNames);
  }

  postIncomeBudgetDetails (incomeDetails: BudgetDetails): Observable<any> {
    return this.http.post(this.POST_INCOME_DETAILS, incomeDetails);
  }

  //Expenses URLs
  postExpensesBasicNames (expensesBasicNames: PostBudgetBasicNames): Observable<any> {
    return this.http.post(this.POST_EXPENSES_BASIC_NAMES, expensesBasicNames);
  }

  postExpensesBudgetDetails (expensesDetails: BudgetDetails): Observable<any> {
    return this.http.post(this.POST_EXPENSES_DETAILS, expensesDetails);
  }

}
