import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  public baseUrl = window["cfgApiBaseUrl"] + "/api";

  constructor() { }
}
