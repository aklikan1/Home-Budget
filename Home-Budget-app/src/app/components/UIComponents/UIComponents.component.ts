import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import {NavbarService} from '../../shared/Navbar/navbar.service';

@Component({
  selector: 'app-components',
  templateUrl: './UIComponents.component.html',
  styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class UIComponentsComponent implements OnInit, OnDestroy {
  data : Date = new Date();

  page = 4;
  page2 = 3;
  focus;
  focus1;


  date: {year: number, month: number};
  model: NgbDateStruct;

  constructor( private renderer : Renderer2, config: NgbAccordionConfig, public nav: NavbarService) {
    config.closeOthers = true;
    config.type = 'info';
  }


  ngOnInit() {
    this.nav.show();

  }
  ngOnDestroy(){

  }
}
