import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { DeleteApiService } from '../../services/shared/delete-api.service';
import { GetApiService } from '../../services/shared/get-api.service';
import { PostApiService } from '../../services/shared/post-api.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { BudgetDetails } from '../../model/budgetDetails';
import { GetBudgetBasicNames } from '../../model/getBudgetBasicNames';
import { PostBudgetBasicNames } from '../../model/postBudgetBasicNames';
import { NotificationService } from '../../services/notification.service';
const moment = _rollupMoment || _moment;
let EditBudgetComponent = class EditBudgetComponent {
    constructor(modalService, postApiService, getApiService, deleteApiService, tokenStorage, notification) {
        this.modalService = modalService;
        this.postApiService = postApiService;
        this.getApiService = getApiService;
        this.deleteApiService = deleteApiService;
        this.tokenStorage = tokenStorage;
        this.notification = notification;
        //Const
        this.INCOME_CATEGORY = "income category";
        this.INCOME_DETAIL = "income detail";
        this.EXPENSES_CATEGORY = "expenses category";
        this.EXPENSES_DETAIL = "expenses detail";
        //Income basic names
        this.incomeBasicNames = [];
        this.incomeActualMoney = [];
        //Expenses basic names
        this.expensesBasicNames = [];
        this.expensesActualMoney = [];
        //Income details
        this.incomeDetails = [];
        this.incomeDetailsCheckDate = [];
        //Expensive details
        this.expensesDetails = [];
        this.expensesDetailsCheckDate = [];
        this.tempDeleteInformation = [];
        //Date
        this.incomeDateCtrl = new FormControl(moment());
        this.expensesDateCtrl = new FormControl(moment());
    }
    ngOnInit() {
        this.getUserByUserId();
        this.getAllBudgetsInfoByUserId();
    }
    getUserByUserId() {
        this.userId = this.tokenStorage.getUserId();
        this.getApiService.getUserByUserId(this.userId).subscribe(user => {
            this.user = user;
        }, error => {
            alert("An error is occurred in getUserByUserId()");
            console.log(error);
        });
    }
    getAllBudgetsInfoByUserId() {
        this.getApiService.getAllBudgetsByUserId(this.userId).subscribe(value => {
            this.budgets = value;
            if (this.budgets.length != 0) {
                this.getAllDataAndSetActualBudget(this.budgets[0]);
                this.budgetArrayGreaterThenZero = true;
            }
            else {
                this.budgetName = "";
                this.budgetArrayGreaterThenZero = false;
            }
        }, () => {
            alert("An error is occurred in getAllBudgetsByUserId()");
        });
    }
    getAllIncomeBasicNamesByBudgetId(id) {
        this.getApiService.getAllIncomeBasicNamesByBudgetId(id).subscribe(value => {
            this.incomeBasicNames = value;
            this.incomeBasicNames.forEach((names) => {
                names.readOnly = true;
                names.isClicked = false;
            });
        }, error => {
            alert("An error is occurred in getAllIncomeBasicNamesByBudgetId()");
            console.log(error);
        });
    }
    getAllIncomeDetailsByBudgetId(id) {
        let getDetails = this.getApiService.getAllIncomeDetailsByBudgetId(id);
        getDetails.subscribe(value => {
            this.incomeDetails = value;
            this.isIncomeMonthAndYearIsActual =
                this.checkAndChangeDateIsActualMonthAndYear(this.incomeDetails, this.incomeDetailsCheckDate, this.incomeDateCtrl.value);
            this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
        }, error => {
            alert("An error is occurred in getAllIncomeDetailsByBasicNamesId()");
            console.log(error);
        });
    }
    getAllExpensesBasicNamesByBudgetId(id) {
        this.getApiService.getAllExpensesBasicNamesByBudgetId(id).subscribe(value => {
            this.expensesBasicNames = value;
            this.expensesBasicNames.forEach((names) => {
                names.readOnly = true;
                names.isClicked = false;
            });
        }, error => {
            alert("An error is occurred in getAllExpensiveBasicNamesByBudgetId()");
            console.log(error);
        });
    }
    getAllExpensesDetailsByBudgetId(id) {
        this.getApiService.getAllExpensesDetailsByBudgetId(id).subscribe(value => {
            this.expensesDetails = value;
            this.isExpensesMonthAndYearIsActual =
                this.checkAndChangeDateIsActualMonthAndYear(this.expensesDetails, this.expensesDetailsCheckDate, this.expensesDateCtrl.value);
            this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
        }, error => {
            alert("An error is occurred in getAllExpensiveDetailsByBudgetId()");
            console.log(error);
        });
    }
    getAllDataAndSetActualBudget(budget) {
        this.actualBudget = budget;
        this.budgetName = this.actualBudget.name;
        this.getAllIncomeBasicNamesByBudgetId(this.actualBudget.id);
        this.getAllIncomeDetailsByBudgetId(this.actualBudget.id);
        this.getAllExpensesBasicNamesByBudgetId(this.actualBudget.id);
        this.getAllExpensesDetailsByBudgetId(this.actualBudget.id);
    }
    postAddNewIncomeBasicNames() {
        let tempPostIncomeBasicName = this.createNewPostBasicName();
        let nameMessage = "income category";
        this.postApiService.postIncomeBasicNames(tempPostIncomeBasicName).subscribe(value => {
            this.createNewGetBasicName(value, this.incomeBasicNames, this.incomeDetails, this.incomeDetailsCheckDate, this.incomeActualMoney, nameMessage);
        });
    }
    postAddNewExpensesBasicNames() {
        let tempPostExpensesBasicName = this.createNewPostBasicName();
        let nameMessage = "expenses category";
        this.postApiService.postExpensesBasicNames(tempPostExpensesBasicName).subscribe(value => {
            this.createNewGetBasicName(value, this.expensesBasicNames, this.expensesDetails, this.expensesDetailsCheckDate, this.expensesActualMoney, nameMessage);
        });
    }
    createNewPostBasicName() {
        let tempPostBasicName = new PostBudgetBasicNames();
        tempPostBasicName.estimated_money = 0;
        tempPostBasicName.name = "";
        tempPostBasicName.budget = this.actualBudget;
        return tempPostBasicName;
    }
    createNewGetBasicName(tempPostExpensesBasicName, basicNames, details, showDetails, actualMoney, nameMessage) {
        let tempGetBasicNames = new GetBudgetBasicNames();
        let tempBudgetDetails = [];
        let tempShowBudgetDetails = [];
        tempGetBasicNames.id = tempPostExpensesBasicName.id;
        tempGetBasicNames.estimated_money = tempPostExpensesBasicName.estimated_money;
        tempGetBasicNames.name = tempPostExpensesBasicName.name;
        tempGetBasicNames.budget = tempPostExpensesBasicName.budget;
        tempGetBasicNames.isClicked = false;
        tempGetBasicNames.readOnly = true;
        actualMoney.push(0);
        basicNames.push(tempGetBasicNames);
        details.push(tempBudgetDetails);
        showDetails.push(tempShowBudgetDetails);
        //Notification
        this.notificationWhenAddNewDataSuccess(nameMessage);
    }
    postUpdateIncomeBasicNames(incomeBasicName) {
        this.postApiService.postIncomeBasicNames(incomeBasicName).subscribe();
    }
    postUpdateExpensesBasicNames(expensesBasicNames) {
        this.postApiService.postExpensesBasicNames(expensesBasicNames).subscribe();
    }
    postAddNewIncomeDetails(actualBasicName, actualBasicNameIndex) {
        let tempBudgetDetail = this.createNewDetailsTemplate(actualBasicName);
        let nameMessage = "income detail";
        this.postApiService.postIncomeBudgetDetails(tempBudgetDetail).subscribe(value => {
            this.incomeDetails[actualBasicNameIndex].push(value);
            this.incomeDetailsCheckDate[actualBasicNameIndex].push(value);
        });
        //Notification
        this.notificationWhenAddNewDataSuccess(nameMessage);
    }
    postAddNewExpensesDetails(actualBasicName, actualBasicNameIndex) {
        let tempBudgetDetail = this.createNewDetailsTemplate(actualBasicName);
        let nameMessage = "expenses detail";
        this.postApiService.postExpensesBudgetDetails(tempBudgetDetail).subscribe(value => {
            this.expensesDetails[actualBasicNameIndex].push(value);
            this.expensesDetailsCheckDate[actualBasicNameIndex].push(value);
        });
        //Notification
        this.notificationWhenAddNewDataSuccess(nameMessage);
    }
    createNewDetailsTemplate(actualBasicName) {
        let tempBudgetDetail = new BudgetDetails();
        tempBudgetDetail.date = new Date();
        tempBudgetDetail.descriptions = "";
        tempBudgetDetail.money = 0;
        tempBudgetDetail.name = "";
        tempBudgetDetail.incomeBasicNames = actualBasicName;
        tempBudgetDetail.expensesBasicNames = actualBasicName;
        return tempBudgetDetail;
    }
    postUpdateIncomeDetails(incomeDetail) {
        this.postApiService.postIncomeBudgetDetails(incomeDetail).subscribe();
        this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
    }
    postUpdateExpensesDetails(expensesDetail) {
        this.postApiService.postExpensesBudgetDetails(expensesDetail).subscribe();
        this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
    }
    reloadEstimatedMoneyInBasicNames(actualMoney, details) {
        actualMoney.length = 0;
        details.forEach(value1 => {
            let tempMoney = 0;
            value1.forEach(value2 => {
                tempMoney = +value2.money + tempMoney;
            });
            actualMoney.push(tempMoney);
        });
    }
    changeBudgetName(content, budget) {
        this.tempBudgetName = this.budgetName;
        this.isSaveNewBudget = false;
        let oldMessage = this.tempBudgetName;
        this.modalService.open(content, { backdrop: false }).result.then(() => {
            //result
            budget.name = this.tempBudgetName;
            this.postApiService.postAddOrChangeBudget(budget).subscribe();
            this.actualBudget = budget;
            this.budgetName = this.actualBudget.name;
            let newMessage = this.budgetName;
            this.notificationWhenChangeData(oldMessage, newMessage);
        }, () => {
            //dismiss
        });
    }
    addNewBudget(content) {
        this.tempBudgetName = "";
        this.isSaveNewBudget = true;
        this.modalService.open(content, { backdrop: false }).result.then(() => {
            //result
            this.tempBudget = new class {
            };
            if (this.tempBudgetName === "") {
                this.tempBudgetName = "Budget name";
            }
            this.tempBudget.name = this.tempBudgetName;
            this.tempBudget.user = this.user;
            this.postApiService.postAddOrChangeBudget(this.tempBudget).subscribe(value => {
                if (this.budgets.length === 0) {
                    this.actualBudget = value;
                    this.budgetName = this.actualBudget.name;
                    this.isIncomeMonthAndYearIsActual = this.checkAndChangeDateIsActualMonthAndYear(this.incomeDetails, this.incomeDetailsCheckDate, this.incomeDateCtrl.value);
                    this.isExpensesMonthAndYearIsActual = this.checkAndChangeDateIsActualMonthAndYear(this.expensesDetails, this.expensesDetailsCheckDate, this.expensesDateCtrl.value);
                }
                this.budgets.push(value);
            });
            this.budgetArrayGreaterThenZero = true;
            this.notificationWhenAddNewDataSuccess(this.tempBudget.name);
            delete this.tempBudget;
        }, () => {
            //dismiss
        });
    }
    deleteBudgetById(content, budget) {
        let id = budget.id;
        this.tempDeleteInformation[0] = budget.name;
        this.tempDeleteInformation[1] = "budget";
        this.modalService.open(content, {}).result.then(result => {
            console.log(result);
            this.deleteApiService.deleteBudgetById(id).subscribe();
            this.budgets.forEach((item, index, array) => {
                if (item.id === id) {
                    array.splice(index, 1);
                }
            });
            if (this.actualBudget.id === id && this.budgets.length != 0) {
                this.getAllDataAndSetActualBudget(this.budgets[0]);
            }
            if (this.budgets.length === 0) {
                delete this.actualBudget;
                this.budgetName = "";
                this.incomeBasicNames.length = 0;
                this.incomeDetails.length = 0;
                this.expensesBasicNames.length = 0;
                this.expensesDetails.length = 0;
                this.budgetArrayGreaterThenZero = false;
            }
            //Notification
            this.notificationWhenDeleteData(budget.name);
        }, dismiss => {
            console.log(dismiss);
        });
    }
    deleteBasicNames(content, basicName, basicNameIndex, constCategory) {
        let id = basicName.id;
        this.tempDeleteInformation[0] = basicName.name;
        this.tempDeleteInformation[1] = constCategory;
        this.modalService.open(content, {}).result.then(() => {
            switch (constCategory) {
                case this.INCOME_CATEGORY: {
                    this.deleteApiService.deleteIncomeBasicNameById(id).subscribe();
                    forEachBasicNameDelete(this.incomeBasicNames);
                    forEachDetailDelete(this.incomeDetails, basicNameIndex);
                    break;
                }
                case this.EXPENSES_CATEGORY: {
                    this.deleteApiService.deleteExpensesBasicNameById(id).subscribe();
                    forEachBasicNameDelete(this.expensesBasicNames);
                    forEachDetailDelete(this.expensesDetails, basicNameIndex);
                    break;
                }
            }
            //Notification
            this.notificationWhenDeleteData(basicName.name);
        }, () => { });
        function forEachBasicNameDelete(budgetBasicNames) {
            budgetBasicNames.forEach((item, index, array) => {
                if (item.id === id) {
                    array.splice(index, 1);
                }
            });
        }
        function forEachDetailDelete(budgetDetails, basicNameIndex) {
            budgetDetails.forEach((item, index, array) => {
                if (basicNameIndex === index) {
                    array.splice(index, 1);
                }
            });
        }
    }
    deleteDetail(content, budgetDetail, basicNameIndex, constDetail) {
        let id = budgetDetail.id;
        this.tempDeleteInformation[0] = budgetDetail.name;
        this.tempDeleteInformation[1] = constDetail;
        this.modalService.open(content, {}).result.then(() => {
            switch (constDetail) {
                case this.INCOME_DETAIL: {
                    this.deleteApiService.deleteIncomeDetailById(id).subscribe();
                    forEachDetailDelete(this.incomeDetails, basicNameIndex, id);
                    forEachDetailDelete(this.incomeDetailsCheckDate, basicNameIndex, id);
                    this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
                    break;
                }
                case this.EXPENSES_DETAIL: {
                    this.deleteApiService.deleteExpensesDetailById(id).subscribe();
                    forEachDetailDelete(this.expensesDetails, basicNameIndex, id);
                    forEachDetailDelete(this.expensesDetailsCheckDate, basicNameIndex, id);
                    this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
                    break;
                }
            }
            //Notification
            this.notificationWhenDeleteData(budgetDetail.name);
        }, () => { });
        function forEachDetailDelete(budgetDetails, basicNameIndex, id) {
            budgetDetails[basicNameIndex].forEach((item, index, array) => {
                if (item.id === id) {
                    array.splice(index, 1);
                }
            });
        }
    }
    //Notifications
    notificationWhenAddNewDataSuccess(nameMessage) {
        let form = this.notification.FORM_TOP;
        let align = this.notification.ALIGN_LEFT;
        let category = this.notification.NOTIFICATION_SUCCESS;
        let message = "New <b>" + nameMessage + "</b> successfully created!";
        this.notification.showNotification(form, align, category, message);
    }
    notificationWhenChangeData(oldMessage, newMessage) {
        let form = this.notification.FORM_TOP;
        let align = this.notification.ALIGN_LEFT;
        let category = this.notification.NOTIFICATION_INFO;
        let message = "<b>" + oldMessage + "</b> has changed to <b>" + newMessage + "</b>";
        this.notification.showNotification(form, align, category, message);
    }
    notificationWhenDeleteData(nameMessage) {
        let form = this.notification.FORM_TOP;
        let align = this.notification.ALIGN_LEFT;
        let category = this.notification.NOTIFICATION_ERROR;
        let message = "<b>" + nameMessage + "</b> successfully deleted!";
        this.notification.showNotification(form, align, category, message);
    }
    showOrHideDetailsClick(basicName) {
        basicName.readOnly = true;
        setTimeout(() => {
            if (basicName.readOnly) {
                basicName.isClicked = !basicName.isClicked;
            }
        }, 250);
    }
    changeReadOnlyWhenDoubleClick(basicName) {
        basicName.readOnly = false;
        let selectInput;
        selectInput = document.getElementById(basicName.id + "-" + basicName.name);
        selectInput.focus();
        selectInput.select();
    }
    addDate(date) {
        let tempDate = new Date(date);
        let year = tempDate.getFullYear().toString();
        return (tempDate.getDate() + "." + (tempDate.getMonth() + 1) + "." + year.substr(year.length - 2)).toString();
    }
    chosenYearHandler(normalizedYear, category) {
        switch (category) {
            case this.INCOME_CATEGORY: {
                changeDateYearMoment(this.incomeDateCtrl);
                this.isIncomeMonthAndYearIsActual =
                    this.checkAndChangeDateIsActualMonthAndYear(this.incomeDetails, this.incomeDetailsCheckDate, this.incomeDateCtrl.value);
                this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
                break;
            }
            case this.EXPENSES_CATEGORY: {
                changeDateYearMoment(this.expensesDateCtrl);
                this.isExpensesMonthAndYearIsActual =
                    this.checkAndChangeDateIsActualMonthAndYear(this.expensesDetails, this.expensesDetailsCheckDate, this.expensesDateCtrl.value);
                this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
                break;
            }
        }
        function changeDateYearMoment(formControlDate) {
            let ctrlValue = formControlDate.value;
            ctrlValue.year(normalizedYear.year());
            formControlDate.setValue(ctrlValue);
        }
    }
    chosenMonthHandler(normalizedMonth, datepicker, category) {
        switch (category) {
            case this.INCOME_CATEGORY: {
                changeDateMonthMoment(this.incomeDateCtrl);
                this.isIncomeMonthAndYearIsActual =
                    this.checkAndChangeDateIsActualMonthAndYear(this.incomeDetails, this.incomeDetailsCheckDate, this.incomeDateCtrl.value);
                this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
                break;
            }
            case this.EXPENSES_CATEGORY: {
                changeDateMonthMoment(this.expensesDateCtrl);
                this.isExpensesMonthAndYearIsActual =
                    this.checkAndChangeDateIsActualMonthAndYear(this.expensesDetails, this.expensesDetailsCheckDate, this.expensesDateCtrl.value);
                this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
                break;
            }
        }
        datepicker.close();
        function changeDateMonthMoment(formControlDate) {
            let ctrlValue = formControlDate.value;
            ctrlValue.month(normalizedMonth.month());
            ctrlValue.year(normalizedMonth.year());
            formControlDate.setValue(ctrlValue);
        }
    }
    checkAndChangeDateIsActualMonthAndYear(allDetails, showedDetail, actualDateMoment) {
        showedDetail.length = 0;
        let tempActualDate = new Date();
        let tempMomentMonth = actualDateMoment.month();
        let tempMomentYear = actualDateMoment.year();
        allDetails.map(detailsNames => {
            let tempDetailName = [];
            detailsNames.map(details => {
                let tempDetailDate = new Date(details.date);
                let tempDetailMonth = tempDetailDate.getMonth();
                let tempDetailYear = tempDetailDate.getFullYear();
                if (tempMomentMonth === tempDetailMonth && tempMomentYear === tempDetailYear) {
                    tempDetailName.push(details);
                }
            });
            showedDetail.push(tempDetailName);
        });
        return tempActualDate.getMonth() === tempMomentMonth && tempActualDate.getFullYear() === tempMomentYear;
    }
    showAllDetails(event, category) {
        event.stopPropagation();
        switch (category) {
            case this.INCOME_CATEGORY: {
                this.incomeDetailsCheckDate = [...this.incomeDetails];
                this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
                this.isIncomeMonthAndYearIsActual = false;
                this.incomeBasicNames.map(names => {
                    names.isClicked = true;
                });
                break;
            }
            case this.EXPENSES_CATEGORY: {
                this.expensesDetailsCheckDate = [...this.expensesDetails];
                this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
                this.isExpensesMonthAndYearIsActual = false;
                this.expensesBasicNames.map(names => {
                    names.isClicked = true;
                });
                break;
            }
        }
    }
    returnToActualDate(event, category) {
        event.stopPropagation();
        switch (category) {
            case this.INCOME_CATEGORY: {
                setActualDate(this.incomeDateCtrl);
                this.isIncomeMonthAndYearIsActual =
                    this.checkAndChangeDateIsActualMonthAndYear(this.incomeDetails, this.incomeDetailsCheckDate, this.incomeDateCtrl.value);
                this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
                break;
            }
            case this.EXPENSES_CATEGORY: {
                setActualDate(this.expensesDateCtrl);
                this.isExpensesMonthAndYearIsActual =
                    this.checkAndChangeDateIsActualMonthAndYear(this.expensesDetails, this.expensesDetailsCheckDate, this.expensesDateCtrl.value);
                this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
            }
        }
        function setActualDate(formControlDate) {
            let tempActualDate = new Date();
            let ctrlValue = formControlDate.value;
            ctrlValue.month(tempActualDate.getMonth());
            ctrlValue.year(tempActualDate.getFullYear());
            formControlDate.setValue(ctrlValue);
        }
    }
};
EditBudgetComponent = __decorate([
    Component({
        selector: 'app-edit-budget',
        templateUrl: './edit-budget.component.html',
        styleUrls: ['./edit-budget.component.scss']
    }),
    __metadata("design:paramtypes", [NgbModal, PostApiService,
        GetApiService, DeleteApiService,
        TokenStorageService, NotificationService])
], EditBudgetComponent);
export { EditBudgetComponent };
//# sourceMappingURL=edit-budget.component.js.map