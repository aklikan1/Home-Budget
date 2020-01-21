import {Component, OnInit, PipeTransform, TemplateRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {Observable} from 'rxjs';
import {DeleteApiService} from '../../../shared/delete-api.service';
import {GetApiService} from '../../../shared/get-api.service';
import {PostApiService} from '../../../shared/post-api.service';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';
import {Budget} from '../dashboard/model/budget';
import {BudgetDetails} from '../dashboard/model/budgetDetails';
import {GetBudgetBasicNames} from '../dashboard/model/getBudgetBasicNames';
import {PostBudgetBasicNames} from '../dashboard/model/postBudgetBasicNames';
import {User} from '../dashboard/model/user';
import {NotificationsComponent} from '../notifications/notifications.component';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.scss']
})
export class EditBudgetComponent implements OnInit {

  //Const
  private INCOME_CATEGORY = "income category";
  private INCOME_DETAIL = "income detail";
  private EXPENSES_CATEGORY = "expenses category";
  private EXPENSES_DETAIL = "expenses detail";

  //User
  private userId: any;
  private user: User;

  //Budget
  private budgets: Budget[];
  private actualBudget: Budget;
  private tempBudget: Budget;
  private budgetName: string;
  private tempBudgetName: string;
  private budgetArrayGreaterThenZero: boolean;

  //Income basic names
  private incomeBasicNames: GetBudgetBasicNames[];
  private incomeActualMoney: number[] = [];

  //Expenses basic names
  private expensesBasicNames: GetBudgetBasicNames[];
  private expensesActualMoney: number[] = [];

  //Income details
  private incomeDetails: BudgetDetails[][];
  private incomeDetailsCheckDate: BudgetDetails[][] = [];

  //Expensive details
  private expensesDetails: BudgetDetails[][];
  private expensesDetailsCheckDate: BudgetDetails[][] = [];

  private isSaveNewBudget: boolean;
  private tempDeleteInformation: string[] = [];

  //Date
  incomeDateCtrl: FormControl = new FormControl(moment());
  isIncomeMonthAndYearIsActual: boolean;
  expensesDateCtrl: FormControl = new FormControl(moment());
  isExpensesMonthAndYearIsActual: boolean;

  constructor(private modalService: NgbModal, private postApiService: PostApiService,
              private getApiService: GetApiService, private deleteApiService: DeleteApiService,
              private tokenStorage: TokenStorageService, private notification: NotificationsComponent) { }

  ngOnInit() {
    this.getUserByUserId();
    this.getAllBudgetsInfoByUserId();
  }

  getUserByUserId () {
    this.userId = this.tokenStorage.getUserId();
    this.getApiService.getUserByUserId(this.userId).subscribe(
      user => {
        this.user = user;
      },
      error => {
        alert("An error is occurred in getUserByUserId()");
        console.log(error);
      }
    );
  }

  getAllBudgetsInfoByUserId () {
    this.getApiService.getAllBudgetsByUserId(this.userId).subscribe(
      value => {
        this.budgets = value;
        if (this.budgets.length != 0) {
          this.getAllDataAndSetActualBudget(this.budgets[0]);
          this.budgetArrayGreaterThenZero = true;
        } else {
          this.budgetName = "";
          this.budgetArrayGreaterThenZero = false;
        }
      },
      () => {
        alert("An error is occurred in getAllBudgetsByUserId()");
      }
    );
  }

  getAllIncomeBasicNamesByBudgetId (id: number) {
    this.getApiService.getAllIncomeBasicNamesByBudgetId(id).subscribe(
      value => {
        this.incomeBasicNames = value;
        this.incomeBasicNames.forEach(
          (names, index) => {
            names.readOnly = true;
            names.isClicked = false;
          }
        );
      },
      error => {
        alert("An error is occurred in getAllIncomeBasicNamesByBudgetId()");
        console.log(error);
      }
    );
  }

  getAllIncomeDetailsByBudgetId (id: number) {
    let getDetails: Observable<BudgetDetails[][]> = this.getApiService.getAllIncomeDetailsByBudgetId(id);
    getDetails.subscribe(
      value => {
        this.incomeDetails = value;
        this.isIncomeMonthAndYearIsActual =
          this.checkAndChangeDateIsActualMonthAndYear(this.incomeDetails, this.incomeDetailsCheckDate, this.incomeDateCtrl.value);
        this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);

      },
      error => {
        alert("An error is occurred in getAllIncomeDetailsByBasicNamesId()");
        console.log(error);
      }
    );
  }

  getAllExpensesBasicNamesByBudgetId (id: number) {
    this.getApiService.getAllExpensesBasicNamesByBudgetId(id).subscribe(
      value => {
        this.expensesBasicNames = value;
        this.expensesBasicNames.forEach(
          (names, index) => {
            names.readOnly = true;
            names.isClicked = false;
          }
        );

      },
      error => {
        alert("An error is occurred in getAllExpensiveBasicNamesByBudgetId()");
        console.log(error);
      }
    );
  }

  getAllExpensesDetailsByBudgetId (id: number) {
    this.getApiService.getAllExpensesDetailsByBudgetId(id).subscribe(
      value => {
        this.expensesDetails = value;
        this.isExpensesMonthAndYearIsActual =
          this.checkAndChangeDateIsActualMonthAndYear(this.expensesDetails, this.expensesDetailsCheckDate, this.expensesDateCtrl.value);
        this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);

        },
      error => {
        alert("An error is occurred in getAllExpensiveDetailsByBudgetId()");
        console.log(error);
      }
    );
  }

  getAllDataAndSetActualBudget(budget: Budget) {
    this.actualBudget = budget;
    this.budgetName = this.actualBudget.name;
    this.getAllIncomeBasicNamesByBudgetId (this.actualBudget.id);
    this.getAllIncomeDetailsByBudgetId(this.actualBudget.id);
    this.getAllExpensesBasicNamesByBudgetId(this.actualBudget.id);
    this.getAllExpensesDetailsByBudgetId(this.actualBudget.id);
  }

  postAddNewIncomeBasicNames() {
    let tempPostIncomeBasicName : PostBudgetBasicNames = this.createNewPostBasicName();
    let nameMessage = "income category";

    this.postApiService.postIncomeBasicNames(tempPostIncomeBasicName).subscribe(
      value => {
        this.createNewGetBasicName(value, this.incomeBasicNames, this.incomeDetails, this.incomeActualMoney, nameMessage);
      }
    );
  }

  postAddNewExpensesBasicNames () {
    let tempPostExpensesBasicName : PostBudgetBasicNames = this.createNewPostBasicName();
    let nameMessage = "expenses category";

    this.postApiService.postExpensesBasicNames(tempPostExpensesBasicName).subscribe(
      value => {
        this.createNewGetBasicName(value, this.expensesBasicNames, this.expensesDetails, this.expensesActualMoney, nameMessage);
      }
    );

  }

  private createNewPostBasicName (): PostBudgetBasicNames {

    let tempPostBasicName : PostBudgetBasicNames = new PostBudgetBasicNames();

    tempPostBasicName.estimated_money = 0;
    tempPostBasicName.name = "";
    tempPostBasicName.budget = this.actualBudget;

    return tempPostBasicName;
  }

  createNewGetBasicName (tempPostExpensesBasicName: PostBudgetBasicNames, basicNames: GetBudgetBasicNames[],
                         details: BudgetDetails[][], actualMoney: number[], nameMessage: string) {
    let tempGetBasicNames: GetBudgetBasicNames = new GetBudgetBasicNames();
    let tempBudgetDetails: BudgetDetails[] = [];

    tempGetBasicNames.id = tempPostExpensesBasicName.id;
    tempGetBasicNames.estimated_money = tempPostExpensesBasicName.estimated_money;
    tempGetBasicNames.name = tempPostExpensesBasicName.name;
    tempGetBasicNames.budget = tempPostExpensesBasicName.budget;
    tempGetBasicNames.isClicked = false;
    tempGetBasicNames.readOnly = true;

    actualMoney.push(0);

    basicNames.push(tempGetBasicNames);
    details.push(tempBudgetDetails);

    //Notification
    this.notificationWhenAddNewData(nameMessage);
  }

  postUpdateIncomeBasicNames(incomeBasicName: PostBudgetBasicNames) {
    this.postApiService.postIncomeBasicNames(incomeBasicName).subscribe();
  }

  postUpdateExpensesBasicNames (expensesBasicNames: PostBudgetBasicNames) {
    this.postApiService.postExpensesBasicNames(expensesBasicNames).subscribe();
  }

  postAddNewIncomeDetails (actualBasicName: GetBudgetBasicNames, actualBasicNameIndex: number) {
    let tempBudgetDetail = this.createNewDetailsTemplate(actualBasicName);
    let nameMessage = "income detail";

    this.postApiService.postIncomeBudgetDetails(tempBudgetDetail).subscribe(
      value => {
        this.incomeDetails[actualBasicNameIndex].push(value);
        this.incomeDetailsCheckDate[actualBasicNameIndex].push(value);
      }
    );

    //Notification
    this.notificationWhenAddNewData(nameMessage);
  }

  postAddNewExpensesDetails (actualBasicName: GetBudgetBasicNames, actualBasicNameIndex: number) {
    let tempBudgetDetail = this.createNewDetailsTemplate(actualBasicName);
    let nameMessage = "expenses detail";

    this.postApiService.postExpensesBudgetDetails(tempBudgetDetail).subscribe(
      value => {
        this.expensesDetails[actualBasicNameIndex].push(value);
        this.expensesDetailsCheckDate[actualBasicNameIndex].push(value);
      }
    );

    //Notification
    this.notificationWhenAddNewData(nameMessage);
  }

  createNewDetailsTemplate (actualBasicName: GetBudgetBasicNames): BudgetDetails {

    let tempBudgetDetail : BudgetDetails = new BudgetDetails();

    tempBudgetDetail.date = new Date();
    tempBudgetDetail.descriptions = "";
    tempBudgetDetail.money = 0;
    tempBudgetDetail.name = "";
    tempBudgetDetail.incomeBasicNames = actualBasicName;
    tempBudgetDetail.expensesBasicNames = actualBasicName;

    return tempBudgetDetail;
  }

  private notificationWhenAddNewData(nameMessage: string) {
    let form = this.notification.FORM_TOP;
    let align = this.notification.ALIGN_LEFT;
    let category = this.notification.NOTIFICATION_SUCCESS;
    let message = "New <b>"+nameMessage+"</b> successfully created!";
    this.notification.showNotification(form, align, category, message);
  }

   postUpdateIncomeDetails (incomeDetail: BudgetDetails) {
    this.postApiService.postIncomeBudgetDetails(incomeDetail).subscribe();
    this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
   }

  postUpdateExpensesDetails(expensesDetail: BudgetDetails) {
    this.postApiService.postExpensesBudgetDetails(expensesDetail).subscribe();
    this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
  }

  reloadEstimatedMoneyInBasicNames (actualMoney: number[], details: BudgetDetails[][]) {
    actualMoney.length = 0;
    details.forEach(
      value1 => {
        let tempMoney = 0;
        value1.forEach(
          value2 => {
            tempMoney = +value2.money+tempMoney;
          });
        actualMoney.push(tempMoney);
      }
    );
  }

  changeBudgetName(content:any, budget: Budget) {
    this.tempBudgetName = this.budgetName;
    this.isSaveNewBudget = false;
    this.modalService.open(content, {backdrop: false}).result.then(
      () => {
        //result
        budget.name = this.tempBudgetName;
        this.postApiService.postAddOrChangeBudget(budget).subscribe();
        this.actualBudget = budget;
        this.budgetName = this.actualBudget.name;
      },
      () => {
        //dismiss
      }
    );
  }

  private addNewBudget (content:any) {
    this.tempBudgetName = "";
    this.isSaveNewBudget = true;
    this.modalService.open(content, {backdrop: false}).result.then(
      () => {
        //result
        this.tempBudget = new class implements Budget {
          id: number;
          name: string;
          user: any;
        };
        if (this.tempBudgetName === "") {
          this.tempBudgetName = "Budget name";
        }
        this.tempBudget.name = this.tempBudgetName;
        this.tempBudget.user = this.user;
        this.postApiService.postAddOrChangeBudget(this.tempBudget).subscribe(
          value => {
            if (this.budgets.length === 0) {
              this.actualBudget = value;
              this.budgetName = this.actualBudget.name;
            }
            this.budgets.push(value);
          }
        );
        this.budgetArrayGreaterThenZero = true;
        delete this.tempBudget;
      },
      () => {
        //dismiss
      }
    );
  }

  private deleteBudgetById (content: TemplateRef<any>, budget: Budget) {
    let id = budget.id;
    this.tempDeleteInformation[0] = budget.name;
    this.tempDeleteInformation[1] = "budget";
    this.modalService.open(content, {}).result.then(
      result => {
        console.log(result);
        this.deleteApiService.deleteBudgetById(id).subscribe();
        this.budgets.forEach( (item, index, array) => {
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
      },
      dismiss => {
        console.log(dismiss);
      }
    );
  }

  deleteBasicNames(content: TemplateRef<any>, basicName: GetBudgetBasicNames,
                   basicNameIndex: number, constCategory: string) {
    let id: number = basicName.id;
    this.tempDeleteInformation[0] = basicName.name;
    this.tempDeleteInformation[1] = constCategory;
    this.modalService.open(content, {}).result.then(
      () => {
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
      },
      () => {}
    );

    function forEachBasicNameDelete(budgetBasicNames: GetBudgetBasicNames[]) {
      budgetBasicNames.forEach( (item, index, array) => {
          if (item.id === id) {
            array.splice(index, 1);
          }
        }
      );
    }

    function forEachDetailDelete(budgetDetails: BudgetDetails[][], basicNameIndex: number) {
      budgetDetails.forEach(
        (item, index, array) => {
          if (basicNameIndex === index) {
            array.splice(index, 1);
          }
        }
      );
    }
  }

  deleteDetail(content: TemplateRef<any>, budgetDetail: BudgetDetails, basicNameIndex: number, constDetail: string) {
    let id: number = budgetDetail.id;
    this.tempDeleteInformation[0] = budgetDetail.name;
    this.tempDeleteInformation[1] = constDetail;

    this.modalService.open(content, {}).result.then(
      () => {
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
      },
      () => {}
    );

    function forEachDetailDelete(budgetDetails: BudgetDetails[][], basicNameIndex: number, id: number) {
      budgetDetails[basicNameIndex].forEach(
        (item, index, array) => {
          if (item.id === id) {
            array.splice(index, 1);
          }
        }
      );
    }

  }

  private notificationWhenDeleteData(nameMessage: string) {
    let form = this.notification.FORM_TOP;
    let align = this.notification.ALIGN_LEFT;
    let category = this.notification.NOTIFICATION_ERROR;
    let message = "<b>"+nameMessage+"</b> successfully deleted!";
    this.notification.showNotification(form, align, category, message);
  }

  showOrHideDetailsClick(basicName: GetBudgetBasicNames) {
    basicName.readOnly = true;
    setTimeout(
      () => {
        if( basicName.readOnly) {
          basicName.isClicked = !basicName.isClicked;
        }
      }, 250
    );
  }

  changeReadOnlyWhenDoubleClick(basicName: GetBudgetBasicNames) {
    basicName.readOnly = false;
    let selectInput: any;
    selectInput = document.getElementById(basicName.id+"-"+basicName.name);
    selectInput.focus();
    selectInput.select();
  }

  addDate (date: Date) : String {
    let tempDate = new Date(date);
    let year: string = tempDate.getFullYear().toString();
    return (tempDate.getDate()+"."+(tempDate.getMonth()+1)+"."+year.substr(year.length-2)).toString();
  }

  chosenYearHandler(normalizedYear: Moment, category: string) {
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

    function changeDateYearMoment(formControlDate: FormControl) {
      let ctrlValue: Moment = formControlDate.value;
      ctrlValue.year(normalizedYear.year());
      formControlDate.setValue(ctrlValue);
    }

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<any>, category: string) {

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

    function changeDateMonthMoment (formControlDate: FormControl) {
      let ctrlValue: Moment = formControlDate.value;
      ctrlValue.month(normalizedMonth.month());
      ctrlValue.year(normalizedMonth.year());
      formControlDate.setValue(ctrlValue);
    }
  }

  checkAndChangeDateIsActualMonthAndYear(allDetails: BudgetDetails[][], showedDetail: BudgetDetails[][],
                                         actualDateMoment: Moment) : boolean {
    showedDetail.length = 0;
    let tempActualDate = new Date();
    let tempMomentMonth = actualDateMoment.month();
    let tempMomentYear = actualDateMoment.year();

    allDetails.map(
      detailsNames => {
        let tempDetailName: BudgetDetails[] = [];
        detailsNames.map(
          details => {
            let tempDetailDate = new Date(details.date);
            let tempDetailMonth = tempDetailDate.getMonth();
            let tempDetailYear = tempDetailDate.getFullYear();
            if (tempMomentMonth === tempDetailMonth && tempMomentYear === tempDetailYear) {
              tempDetailName.push(details);
            }
        });
        showedDetail.push(tempDetailName);
      }
    );

    return tempActualDate.getMonth() === tempMomentMonth && tempActualDate.getFullYear() === tempMomentYear;

  }

  showAllDetails(event: any, category: string) {
    event.stopPropagation();
    switch (category) {
      case this.INCOME_CATEGORY: {
        this.incomeDetailsCheckDate = [...this.incomeDetails];
        this.reloadEstimatedMoneyInBasicNames(this.incomeActualMoney, this.incomeDetailsCheckDate);
        this.isIncomeMonthAndYearIsActual = false;
        break;
      }
      case this.EXPENSES_CATEGORY: {
        this.expensesDetailsCheckDate = [...this.expensesDetails];
        this.reloadEstimatedMoneyInBasicNames(this.expensesActualMoney, this.expensesDetailsCheckDate);
        this.isExpensesMonthAndYearIsActual = false;
        break;
      }
    }
  }

}
