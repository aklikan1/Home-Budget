import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from '../../../shared/Navbar/navbar.service';
import {SignUpInfo} from "../auth/signup-info";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

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

  constructor(private authService: AuthService, private navbarService: NavbarService) { }

  ngOnInit() {

    this.navbarService.show();

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  onSubmit() {
    console.log(this.form);

    this.signUpInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signUpInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignedUpFailed = false;

        window.location.reload();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignedUpFailed = true;
      }
    );


  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

  }
}
