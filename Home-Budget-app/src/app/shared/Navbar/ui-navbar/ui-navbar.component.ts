import {Component, ElementRef, OnInit} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {TokenStorageService} from '../../../components/UIComponents/auth/token-storage.service';
import {NavbarService} from '../navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './ui-navbar.component.html',
  styleUrls: ['./ui-navbar.component.scss']
})
export class UiNavbarComponent implements OnInit {

  private toggleButton: any;
  private sidebarVisible: boolean;

  isLoggedIn = false;
  roles: string[] = [];

  constructor(private element : ElementRef, public nav: NavbarService,
              private tokenStorage: TokenStorageService) {

  }

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
