import {Component, Inject, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/auth/token-storage.service';
import {APP_BASE_HREF} from '@angular/common';

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";

  constructor(public tokenStorage: TokenStorageService, @Inject(APP_BASE_HREF) public baseHref: string) {}
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
      sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
      mainPanel.setAttribute('data',color);
    }
  }

  ngOnInit() {
    if (!this.tokenStorage.getToken() && location.pathname != (this.baseHref+"login") && location.pathname != (this.baseHref+"register")) {
      location.replace(this.baseHref+"login");
    }
  }
}
