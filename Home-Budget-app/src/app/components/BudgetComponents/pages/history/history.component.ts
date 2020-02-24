import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {GetApiService} from '../../../shared/get-api.service';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';
import {BudgetHistory} from '../../model/budgetHistory';

@Component({
  selector: "app-tables",
  templateUrl: "history.component.html",
  styleUrls: ['history.component.scss']
})
export class HistoryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private historyList: BudgetHistory[] = [];
  private displayedColumns: string[] = ['description', 'name', 'weight', 'symbol'];
  private dataSource : MatTableDataSource<BudgetHistory>;

  private date: string[] = [];
  private time: string[] = [];

  constructor(private getApiService: GetApiService, private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.getAllHistoryByUserId();
  }

  getAllHistoryByUserId () {
    let userId: number = Number(this.tokenStorage.getUserId());
    this.getApiService.getAllHistoryByUserId(userId).subscribe(
      value => {
        this.historyList = value;
        this.historyList.map(
          (historyValue) => {
            //historyValue.time = this.createTime(historyValue);
            this.createDateAndTime(historyValue);
          }
        );
        this.createMatTable(this.historyList);
      },
      () => {
        alert("An error has occurred in getAllHistoryByUserId()")
      }
    );
  }

  createDateAndTime(history: BudgetHistory) {
    let date: Date = new Date(history.date);

    let day: string = changeToTwoDigitsDate(date.getDate());
    let month: string = changeToTwoDigitsDate(date.getMonth()+1);
    let year: string = String(date.getFullYear());

    let minutes: string = changeToTwoDigitsDate(date.getMinutes());
    let hour: string = changeToTwoDigitsDate(date.getUTCHours());

    history.fullDate = day+"-"+month+"-"+year;
    history.time = hour+":"+minutes;

    function changeToTwoDigitsDate(dateNumber: number): string {
      return dateNumber < 10 ? '0'+dateNumber : ''+dateNumber;
    }
  }

  createMatTable(budgetHistory: BudgetHistory[]) {
    this.dataSource = new MatTableDataSource<BudgetHistory>(budgetHistory);
    this.dataSource.paginator = this.paginator;
  }
}
