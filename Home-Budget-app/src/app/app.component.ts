import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiNavbarComponent} from './shared/Navbar/ui-navbar/ui-navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  @ViewChild(UiNavbarComponent, {static: false}) navbar: UiNavbarComponent;

  constructor() {}

  ngOnInit() {

  }
}
