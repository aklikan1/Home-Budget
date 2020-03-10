import { __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetApiService } from '../../../../shared/get-api.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
let HistoryComponent = class HistoryComponent {
    constructor(getApiService, tokenStorage) {
        this.getApiService = getApiService;
        this.tokenStorage = tokenStorage;
        this.historyList = [];
        this.displayedColumns = ['description', 'name', 'weight', 'symbol'];
        this.date = [];
        this.time = [];
    }
    ngOnInit() {
        this.getAllHistoryByUserId();
    }
    getAllHistoryByUserId() {
        let userId = Number(this.tokenStorage.getUserId());
        this.getApiService.getAllHistoryByUserId(userId).subscribe(value => {
            this.historyList = value;
            this.historyList.map((historyValue) => {
                //historyValue.time = this.createTime(historyValue);
                this.createDateAndTime(historyValue);
            });
            this.createMatTable(this.historyList);
        }, () => {
            alert("An error has occurred in getAllHistoryByUserId()");
        });
    }
    createDateAndTime(history) {
        let date = new Date(history.date);
        let day = changeToTwoDigitsDate(date.getDate());
        let month = changeToTwoDigitsDate(date.getMonth() + 1);
        let year = String(date.getFullYear());
        let minutes = changeToTwoDigitsDate(date.getMinutes());
        let hour = changeToTwoDigitsDate(date.getUTCHours());
        history.fullDate = day + "-" + month + "-" + year;
        history.time = hour + ":" + minutes;
        function changeToTwoDigitsDate(dateNumber) {
            return dateNumber < 10 ? '0' + dateNumber : '' + dateNumber;
        }
    }
    createMatTable(budgetHistory) {
        this.dataSource = new MatTableDataSource(budgetHistory);
        this.dataSource.paginator = this.paginator;
    }
};
__decorate([
    ViewChild(MatPaginator, { static: true }),
    __metadata("design:type", MatPaginator)
], HistoryComponent.prototype, "paginator", void 0);
HistoryComponent = __decorate([
    Component({
        selector: "app-tables",
        templateUrl: "history.component.html",
        styleUrls: ['history.component.scss']
    }),
    __metadata("design:paramtypes", [GetApiService, TokenStorageService])
], HistoryComponent);
export { HistoryComponent };
//# sourceMappingURL=history.component.js.map