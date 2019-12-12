import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from "../UIComponents/auth/token-storage.service";
import * as Rellax from 'rellax';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;

  constructor(private token: TokenStorageService, private element : ElementRef) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

 }
