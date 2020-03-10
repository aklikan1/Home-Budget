import { __decorate } from "tslib";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../../app-routing.module';
let BudgetComponentsModule = class BudgetComponentsModule {
};
BudgetComponentsModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            BrowserAnimationsModule,
            FormsModule,
            HttpClientModule,
            NgbModule,
            RouterModule,
            AppRoutingModule,
        ],
        exports: []
    })
], BudgetComponentsModule);
export { BudgetComponentsModule };
//# sourceMappingURL=budget-components.module.js.map