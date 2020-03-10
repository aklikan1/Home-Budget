import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //Const notification category
  public NOTIFICATION_INFO = 'INFO';
  public NOTIFICATION_SUCCESS = 'SUCCESS';
  public NOTIFICATION_WARNING = 'WARNING';
  public NOTIFICATION_ERROR = 'ERROR';
  public NOTIFICATION_SHOW = 'SHOW';

  //Position form
  public FORM_TOP = 'top';
  public FORM_BOTTOM = 'bottom';

  //Position align
  public ALIGN_LEFT = 'left';
  public ALIGN_CENTER = 'center';
  public ALIGN_RIGHT = 'right';

  constructor(private toastr: ToastrService) {}

  showNotification(from, align, category: string, message){

    if (category === "") {
      category = this.NOTIFICATION_SHOW
    }
    if (message === "") {
      message = "default message"
    }

    switch(category){
      case this.NOTIFICATION_INFO:
        this.toastr.info('<span class="tim-icons icon-bell-55"></span>'+message, '', {
          timeOut: 2000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case this.NOTIFICATION_SUCCESS:
        this.toastr.success('<span class="tim-icons icon-bell-55"></span>'+message, '', {
          timeOut: 2000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case this.NOTIFICATION_WARNING:
        this.toastr.warning('<span class="tim-icons icon-bell-55"></span>'+message, '', {
          timeOut: 2000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case this.NOTIFICATION_ERROR:
        this.toastr.error('<span class="tim-icons icon-bell-55"></span>'+message, '', {
          timeOut: 2000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case this.NOTIFICATION_SHOW:
        this.toastr.show('<span class="tim-icons icon-bell-55"></span>'+message, '', {
          timeOut: 2000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      default:
        break;
    }
  }
}
