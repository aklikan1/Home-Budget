import {Component, OnInit} from '@angular/core';
import {Budget} from "./model/budget";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budget: Budget[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllBudget();
  }

  public getAllBudget(){
    this.apiService.getAllBudget().subscribe(
      res => {
        this.budget = res;
      },
      err => {
        alert("An error has occurred;");
      }
    );
  }
  
}
