import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Budget} from "../budget/model/budget";
import {BudgetViewModel} from "../new-budget/new-budget.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/api";
  private ALL_BUDGET_URL = `${this.BASE_URL}\\budget`;
  private GET_USER = `${this.BASE_URL}\\user\\a`;

  constructor(private http: HttpClient) {

  }

  getAllBudget() : Observable<Budget[]> {
    return this.http.get<Budget[]>(this.ALL_BUDGET_URL);
  }

  addNewBudget(budget: BudgetViewModel) : Observable<any> {
    return this.http.post(this.ALL_BUDGET_URL, budget);
  }

  getUser() : Observable<User[]> {
    return this.http.get<User[]>(this.GET_USER);
  }

}

export interface User {
  id:number;
  username:string;
  password:string;
  is_active:boolean;
  descriptions:string;
}
