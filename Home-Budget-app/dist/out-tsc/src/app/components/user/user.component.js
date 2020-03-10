import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { UserService } from "../services/user.service";
let UserComponent = class UserComponent {
    constructor(userService) {
        this.userService = userService;
    }
    ngOnInit() {
        this.userService.getUserBoard().subscribe(data => {
            this.board = data;
        }, error => {
            this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        });
    }
};
UserComponent = __decorate([
    Component({
        selector: 'app-user',
        templateUrl: './user.component.html',
        styleUrls: ['./user.component.scss']
    }),
    __metadata("design:paramtypes", [UserService])
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map