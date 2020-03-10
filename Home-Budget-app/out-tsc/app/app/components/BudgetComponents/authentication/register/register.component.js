import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { SignUpInfo } from '../../../services/auth/signup-info';
import { TokenStorageService } from '../../../services/auth/token-storage.service';
let RegisterComponent = class RegisterComponent {
    constructor(authService, tokenStorage) {
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.form = [];
        this.isSignedUp = false;
        this.isSignedUpFailed = false;
        this.errorMessage = '';
        this.data = new Date();
    }
    ngOnInit() {
    }
    onSubmit() {
        this.signUpInfo = new SignUpInfo(this.form.name, this.form.username, this.form.email, this.form.password);
        this.authService.signUp(this.signUpInfo).subscribe(data => {
            this.registerForm = document.getElementById("registerForm");
            this.isSignedUp = true;
            this.isSignedUpFailed = false;
            this.registerForm.reset();
        }, error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isSignedUp = false;
            this.isSignedUpFailed = true;
        });
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }),
    __metadata("design:paramtypes", [AuthService, TokenStorageService])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map