import { __decorate, __metadata } from "tslib";
import { Component, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
let NotificationsComponent = class NotificationsComponent {
    constructor(toastr) {
        this.toastr = toastr;
        //Const notification category
        this.NOTIFICATION_INFO = 'INFO';
        this.NOTIFICATION_SUCCESS = 'SUCCESS';
        this.NOTIFICATION_WARNING = 'WARNING';
        this.NOTIFICATION_ERROR = 'ERROR';
        this.NOTIFICATION_SHOW = 'SHOW';
        //Position form
        this.FORM_TOP = 'top';
        this.FORM_BOTTOM = 'bottom';
        //Position align
        this.ALIGN_LEFT = 'left';
        this.ALIGN_CENTER = 'center';
        this.ALIGN_RIGHT = 'right';
        this.staticAlertClosed = false;
        this.staticAlertClosed1 = false;
        this.staticAlertClosed2 = false;
        this.staticAlertClosed3 = false;
        this.staticAlertClosed4 = false;
        this.staticAlertClosed5 = false;
        this.staticAlertClosed6 = false;
        this.staticAlertClosed7 = false;
    }
    showNotification(from, align, category, message) {
        if (category === "") {
            category = this.NOTIFICATION_SHOW;
        }
        if (message === "") {
            message = "default message";
        }
        switch (category) {
            case this.NOTIFICATION_INFO:
                this.toastr.info('<span class="tim-icons icon-bell-55"></span>' + message, '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-info alert-with-icon",
                    positionClass: 'toast-' + from + '-' + align
                });
                break;
            case this.NOTIFICATION_SUCCESS:
                this.toastr.success('<span class="tim-icons icon-bell-55"></span>' + message, '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-' + from + '-' + align
                });
                break;
            case this.NOTIFICATION_WARNING:
                this.toastr.warning('<span class="tim-icons icon-bell-55"></span>' + message, '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-warning alert-with-icon",
                    positionClass: 'toast-' + from + '-' + align
                });
                break;
            case this.NOTIFICATION_ERROR:
                this.toastr.error('<span class="tim-icons icon-bell-55"></span>' + message, '', {
                    timeOut: 2000,
                    enableHtml: true,
                    closeButton: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: 'toast-' + from + '-' + align
                });
                break;
            case this.NOTIFICATION_SHOW:
                this.toastr.show('<span class="tim-icons icon-bell-55"></span>' + message, '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-primary alert-with-icon",
                    positionClass: 'toast-' + from + '-' + align
                });
                break;
            default:
                break;
        }
    }
};
NotificationsComponent = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    Component({
        selector: "app-notifications",
        templateUrl: "notifications.component.html"
    }),
    __metadata("design:paramtypes", [ToastrService])
], NotificationsComponent);
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map