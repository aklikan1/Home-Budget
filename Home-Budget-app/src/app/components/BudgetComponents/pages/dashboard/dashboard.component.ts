import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {GetApiService} from '../../../shared/get-api.service';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';
import {BasicNamesAndDetailsMoney} from '../../model/basicNamesAndDetailsMoney';
import {Budget} from '../../model/budget';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  public DAY_LABEL = "day";
  public WEEK_LABEL = "week";
  public MONTH_LABEL = "month";

  private setDateInDays: any = [];
  private setDateInWeeks: any = [];
  private setDateInMonths: any = [];

  private gradientChartOptionsConfigurationWithTooltipRed:any;
  private gradientChartOptionsConfigurationWithTooltipGreen: any;
  private gradientChartOptionsConfigurationWithTooltipBlue: any;

  private gradientBarChartConfigurationGreen: any;
  private gradientBarChartConfigurationRed: any;

  public canvas : any;
  public ctx;

  public totalChangesDataSets: any;
  public totalChangesData: any;
  public totalChangesChartLabels: string[] = [];
  public totalChangesFinalMoney: number;
  public totalChangesLineChart;
  public dailyActiveButton: boolean = true;
  public weeklyActiveButton: boolean = false;
  public monthlyActiveButton: boolean = false;

  public incomeDetailsData: number[] = [];
  public incomeDetailsChartLabels: string[] = [];
  public incomeDetailsFinalMoney: number = 0;
  public incomeDetailsBarChart;

  public expensesDetailsData: number[] = [];
  public expensesDetailsChartLabel: string[] = [];
  public expensesDetailsFinalMoney: number = 0;
  public expensesDetailsBarChart;

  private userId: string;
  public budgets: Budget[] = [];
  public incomeNamesMoney: BasicNamesAndDetailsMoney[] = [];
  public expensesNamesMoney: BasicNamesAndDetailsMoney[] = [];
  public mainBudgetName: string;

  constructor(private apiService: GetApiService, private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.userId = this.tokenStorage.getUserId();

    this.createGradientChartOptionsConfigurationWithTooltipRed();
    this.createGradientChartOptionsConfigurationWithTooltipGreen();
    this.createGradientChartOptionsConfigurationWithTooltipBlue();

    this.createGradientBarChartConfigurationGreen();
    this.createGradientBarChartConfigurationRed();

    this.createIncomeDetailsBarChart();

    this.initialGetAllInfoAboutBudgetsMoneyDetails();

    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.canvas = document.getElementById("chartLineRed");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#ec250d',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#ec250d',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#ec250d',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [80, 100, 70, 80, 120, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: this.gradientChartOptionsConfigurationWithTooltipRed
    });

    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");


    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [90, 27, 60, 12, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: this.gradientChartOptionsConfigurationWithTooltipGreen

    });


    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


    var myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        datasets: [{
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45],
        }]
      },
      options: gradientBarChartConfiguration
    });

  }

  //Initial charts
  private createTotalChangesLineChart () {
    //Total changes chart
    this.addTwelveNumbersDate();
    this.totalChangesChartLabels = this.setDateInDays;

    let totalChangesCanvas: any = document.getElementById("totalChangesChart");
    let totalChangesCtx = totalChangesCanvas.getContext("2d");

    let totalChangesGradientStroke = totalChangesCtx.createLinearGradient(0, 230, 0, 50);

    totalChangesGradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    totalChangesGradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    totalChangesGradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    let totalChangesConfig = {
      type: 'line',
      data: {
        labels: this.totalChangesChartLabels,
        datasets: [{
          label: "PLN",
          fill: true,
          backgroundColor: totalChangesGradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#1f8ef1',
          pointBorderColor: 'rgba(29,140,248,0)',
          pointHoverBackgroundColor: '#1f8ef1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.totalChangesData,
        }]
      },
      options: this.gradientChartOptionsConfigurationWithTooltipBlue
    };
    this.totalChangesLineChart = new Chart(totalChangesCtx, totalChangesConfig);

  }

  private createIncomeDetailsBarChart () {
    let incomeDetailsCanvas: any = document.getElementById("IncomeDetailsBarChart");
    console.log(document.getElementById("IncomeDetailsBarChart"));
    let incomeDetailsCtx  = incomeDetailsCanvas.getContext("2d");
    let incomeDetailsGradientStroke = incomeDetailsCtx.createLinearGradient(0, 230, 0, 50);

    incomeDetailsGradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    incomeDetailsGradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    incomeDetailsGradientStroke.addColorStop(0, 'rgba(66,134,121,0)');

    this.incomeDetailsBarChart = new Chart(incomeDetailsCtx, {
      type: 'bar',
      data: {
        labels: this.incomeDetailsChartLabels,
        datasets: [
          {
          label: "PLN",
          fill: true,
          backgroundColor: incomeDetailsGradientStroke,
          hoverBackgroundColor: incomeDetailsGradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: this.incomeDetailsData
        }]
      },
      options: this.gradientBarChartConfigurationGreen
    });
  }

  private createExpensesDetailsBarChart () {
    let expensesDetailsCanvas: any = document.getElementById("ExpensesDetailsBarChart");
    let expensesDetailsCtx  = expensesDetailsCanvas.getContext("2d");
    let expensesDetailsGradientStroke = expensesDetailsCtx.createLinearGradient(0, 230, 0, 50);

    expensesDetailsGradientStroke.addColorStop(1, 'rgba(233,32,16,0.15)');
    expensesDetailsGradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    expensesDetailsGradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    this.expensesDetailsBarChart = new Chart(expensesDetailsCtx, {
      type: 'bar',
      data: {
        labels: this.expensesDetailsChartLabel,
        datasets: [{
          label: "PLN",
          fill: true,
          backgroundColor: expensesDetailsGradientStroke,
          hoverBackgroundColor: expensesDetailsGradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: this.expensesDetailsData
        }]
      },
      options: this.gradientBarChartConfigurationRed
    });

  }

  //Gradient options
  private createGradientChartOptionsConfigurationWithTooltipRed() {
    this.gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };
}

  private createGradientChartOptionsConfigurationWithTooltipGreen() {
    this.gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
  }

  private createGradientChartOptionsConfigurationWithTooltipBlue() {
    this.gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };
  }

  private createGradientBarChartConfigurationGreen () {
    this.gradientBarChartConfigurationGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
  }

  private createGradientBarChartConfigurationRed () {
    this.gradientBarChartConfigurationRed = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
  }

  //Data from SQL
  private initialGetAllInfoAboutBudgetsMoneyDetails(){
    this.apiService.getAllBudgetsByUserId(this.userId).subscribe(
      budgets => {
        this.budgets = budgets;
        this.mainBudgetName = this.budgets[0].name;
        this.totalMoneyInTimeByBudgetId(this.budgets[0].id);
        this.incomeNamesMoneyByBudgetId(this.budgets[0].id);
        this.expensesNamesMoneyByBudgetId(this.budgets[0].id);
      },
      () => {
        alert("An error has occurred in initialGetAllInfoAboutBudgetsMoneyDetails()");
      }
    );
  }

  private totalMoneyInTimeByBudgetId (id: number) {
    this.apiService.getMoneyInTimeByBudgetId(id).subscribe(
      incomeMoneyByTime => {
        this.totalChangesDataSets = incomeMoneyByTime;
        this.totalChangesData = incomeMoneyByTime[0];
        this.totalChangesFinalMoney = incomeMoneyByTime[0][11];
        if (document.getElementById("totalChangesChart").className == "") {
          this.createTotalChangesLineChart();
        } else {
          this.totalChangesUpdateOptions(0,'day', true, false, false);
        }

      }, () => {
        alert ("An error has occurred in initialIncomeMoneyInTimeByBudgetId()");
      }
    );
  }

  private incomeNamesMoneyByBudgetId (id: number) {
    this.apiService.getIncomeNamesAndMoneyByBudgetId(id).subscribe(
      incomeDetails => {
        this.incomeNamesMoney = incomeDetails;
        this.incomeDetailsChartLabels.length = 0;
        this.incomeDetailsData.length = 0;
        this.incomeDetailsFinalMoney = 0;
        this.incomeNamesMoney.forEach(income => {
          this.incomeDetailsChartLabels.push(income.name);
          this.incomeDetailsData.push(income.money);
          this.incomeDetailsFinalMoney = this.incomeDetailsFinalMoney + income.money;
        });
        if (document.getElementById("IncomeDetailsBarChart").className == "") {
          this.createIncomeDetailsBarChart();
        } else {
          this.detailsUpdateOptions(this.incomeDetailsBarChart, this.incomeDetailsData, this.incomeDetailsChartLabels);
        }
      },
      () => {
        alert("An error has occurred in incomeNamesMoneyByBudgetId()");
      }
    );
  }

  private expensesNamesMoneyByBudgetId (id: number) {
    this.apiService.getExpensesNamesAndMoneyByBudgetId(id).subscribe(
      expensesDetails => {
        this.expensesNamesMoney = expensesDetails;
        this.expensesDetailsChartLabel.length = 0;
        this.expensesDetailsData.length = 0;
        this.expensesDetailsFinalMoney = 0;
        this.expensesNamesMoney.forEach(expenses => {
          this.expensesDetailsChartLabel.push(expenses.name);
          this.expensesDetailsData.push(expenses.money);
          this.expensesDetailsFinalMoney = this.expensesDetailsFinalMoney + expenses.money;
        });
        if (document.getElementById("ExpensesDetailsBarChart").className == "") {
          this.createExpensesDetailsBarChart();
        } else {
          this.detailsUpdateOptions(this.expensesDetailsBarChart, this.expensesDetailsData, this.expensesDetailsChartLabel);
        }

      },
      () => {
        alert("An error has occurred in expensesNamesMoneyByBudgetId()");
      }
    );
  }

  //To HTML without data from SQL
  private addTwelveNumbersDate() {
    let actualDate = new Date();

    for (let i = 0; i < 12; i++) {
      let tempDayDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()-i);
      this.setDateInDays[11-i] = tempDayDate.getDate()+"."+add0ToMonth(tempDayDate);

      let tempWeekDate = new Date (actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()-(i*7));
      this.setDateInWeeks[11-i] = tempWeekDate.getDate()+"."+add0ToMonth(tempWeekDate);

      let tempMonthDate = new Date (actualDate.getFullYear(), actualDate.getMonth()-i, actualDate.getDate());
      this.setDateInMonths[11-i] = add0ToMonth(tempMonthDate)+"."+tempMonthDate.getFullYear();
    }

    function add0ToMonth(tempDate: Date) {
      if ((tempDate.getMonth()+1)<10) {
        return "0"+(tempDate.getMonth()+1);
      } else {
        return (tempDate.getMonth()+1);
      }
    }

  }

  //Functions work within click
  public changeMainBudget(name: string) {
    this.mainBudgetName = name;
  }

  public totalChangesUpdateOptions(dataIndex: number, timeLine: string, dailyClick: boolean, weeklyClick: boolean, monthlyClick) {
    this.totalChangesData=this.totalChangesDataSets[dataIndex];
    switch (timeLine) {
      case this.DAY_LABEL: {
        this.totalChangesChartLabels=this.setDateInDays;
        break;
      }
      case this.WEEK_LABEL: {
        this.totalChangesChartLabels=this.setDateInWeeks;
        break;
      }
      case this.MONTH_LABEL: {
        this.totalChangesChartLabels=this.setDateInMonths;
        break;
      }
    }

    this.totalChangesLineChart.data.datasets[0].data = this.totalChangesData;
    this.totalChangesLineChart.data.labels = this.totalChangesChartLabels;
    this.totalChangesLineChart.update();

    this.dailyActiveButton=dailyClick;
    this.weeklyActiveButton=weeklyClick;
    this.monthlyActiveButton=monthlyClick;
  }

  public detailsUpdateOptions (detailsBarChart: any, detailsData: any, detailsChartLabel: any) {
    detailsBarChart.data.data = detailsData;
    detailsBarChart.data.labels = detailsChartLabel;
    detailsBarChart.update();
  }

  //Other functions

}
