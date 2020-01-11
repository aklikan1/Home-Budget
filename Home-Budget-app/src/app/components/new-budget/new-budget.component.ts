import {Component, OnInit} from '@angular/core';
import {GetApiService, UserGetApi} from "../shared/get-api.service";

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.scss']
})
export class NewBudgetComponent implements OnInit {
  model:BudgetViewModel = {
    name:'',
    user:[]
  };
  user: UserGetApi[] = [];

  constructor(private apiService: GetApiService) {

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
