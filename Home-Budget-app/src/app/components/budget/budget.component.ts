import {Component, OnInit} from '@angular/core';
import {Budget} from "../BudgetComponents/pages/dashboard/model/budget";
import {GetApiService} from "../shared/get-api.service";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget: Budget[] = [];

  constructor(private apiService: GetApiService) { }

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
