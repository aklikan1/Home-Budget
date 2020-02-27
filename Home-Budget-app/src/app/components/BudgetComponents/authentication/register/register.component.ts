import { Component, OnInit } from '@angular/core';
import {Form} from '@angular/forms';
import {AuthService} from '../../../UIComponents/auth/auth.service';
import {SignUpInfo} from '../../../UIComponents/auth/signup-info';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = [];
  signUpInfo: SignUpInfo;
  isSignedUp = false;
  isSignedUpFailed = false;
  errorMessage = '';

  data : Date = new Date();
  focusName;
  focusUsername;
  focusMail;
  focusPassword;

  registerForm: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

 ngOnInit() {
    this.registerForm = document.getElementById("registerForm");
 }


  onSubmit() {

    this.signUpInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signUpInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignedUpFailed = false;

        this.registerForm.reset();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignedUp = false;
        this.isSignedUpFailed = true;
      }
    );


  }

}
