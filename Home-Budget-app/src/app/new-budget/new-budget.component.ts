import {Component, OnInit} from '@angular/core';
import {ApiService, User} from "../shared/api.service";

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css']
})
export class NewBudgetComponent implements OnInit {
  model:BudgetViewModel = {
    name:'',
    user:[]
  };
  user: User[] = [];

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {

  }

  sendBudget():void{
    this.apiService.getUser().subscribe(
      res => {
        this.user = res;
        this.model.user = this.user;
      },
      err => {
        alert("User cannot be imported;");
      }
    );
    this.apiService.addNewBudget(this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("An error has occurred while sending budget");
        console.log(this.model)
      }
    );
  }

}

export interface BudgetViewModel {
  name:string;
  user:any;
}
