import { Injectable } from '@angular/core';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  readonly apiUrl = "https://parseapi.back4app.com/";
  readonly appId = "fTbYo6sPKFePYjH1HBa5sf2MhM1e0277FpxSow5w";
  readonly jsKey = "nqZvftU75PGh7kRLxwU7BtxlQnyDhB7mbfJ0rXMX";

  result: any;

  constructor() {

    this.parseInitialize();
    console.log('Initiated Parse');
    
  }
  private parseInitialize() {
    Parse.serverURL = this.apiUrl;
    Parse.initialize(this.appId, this.jsKey);    
  }

}