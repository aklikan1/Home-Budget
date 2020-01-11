import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseUrlService} from '../../shared/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteApiService {

  //Budget URLs
  private DELETE_BUDGET_BY_ID = `${this.baseUrl.baseUrl}\\budget\\`;

  //Income URLs
  private DELETE_INCOME_BASIC_NAME_BY_ID = `${this.baseUrl.baseUrl}\\incomeBasicNames\\`;
  private DELETE_INCOME_DETAIL_BY_ID = `${this.baseUrl.baseUrl}\\incomeDetails\\`;

  //Expenses URLs
  private DELETE_EXPENSES_BASIC_NAME_BY_ID = `${this.baseUrl.baseUrl}\\expensesBasicNames\\`;
  private DELETE_EXPENSES_DETAIL_BY_ID = `${this.baseUrl.baseUrl}\\expensesDetails\\`;

  constructor(private baseUrl: BaseUrlService, private http: HttpClient) {}

  // <-- FUNCTIONS -->

  //Budget
  deleteBudgetById (id: number) : Observable<any> {
    return this.http.delete<any>(this.DELETE_BUDGET_BY_ID+id);
  }

  //Income basic names
  deleteIncomeBasicNameById (id: number): Observable<any> {
    return this.http.delete<any>(this.DELETE_INCOME_BASIC_NAME_BY_ID+id);
  }

  //Expenses basic names
  deleteExpensesBasicNameById (id: number): Observable<any> {
    return this.http.delete<any>(this.DELETE_EXPENSES_BASIC_NAME_BY_ID+id);
  }

  //Income details
  deleteIncomeDetailById (id: number): Observable<any> {
    return this.http.delete<any>(this.DELETE_INCOME_DETAIL_BY_ID+id);
  }

  //Expenses details
  deleteExpensesDetailById (id: number): Observable<any> {
    return this.http.delete(this.DELETE_EXPENSES_DETAIL_BY_ID+id);
  }
}
