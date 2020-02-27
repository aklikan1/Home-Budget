import { Component, OnInit } from "@angular/core";
import {NavbarService} from '../../../../shared/Navbar/navbar.service';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";

  constructor(private tokenStorage: TokenStorageService) {}
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
    if (!this.tokenStorage.getToken() && location.pathname != "/budget/login" && location.pathname != "/budget/register") {
      location.replace("/budget/login");
    }
  }
}
