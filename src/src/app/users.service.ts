import { Injectable } from '@angular/core';
import { Parse } from 'parse'
import { ParseError } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: Parse.User;

  constructor() {
    this.user = Parse.User.current();
  }

  getUser() {
    return this.user;
  }

  async getViagens(offset: number = 0, limit: number = 999): Promise<any> {
    const Viagem = Parse.Object.extend('Viagem');
    let query = new Parse.Query(Viagem);
    query.equalTo("User", this.user);
    query.ascending("Data");
    const results = await query.find();
    return results;
  }

  addViagem(viagem): Promise<any> {
    const Viagem = Parse.Object.extend('Viagem');

    let viagemParse = new Viagem();
    viagemParse.set('Local', viagem.local);
    viagemParse.set('Data', viagem.data);
    viagemParse.set('User', this.user);

    return viagemParse.save(null, {
      success: function (viagemParse) {
        console.log(viagemParse);
        return viagemParse;
      },
      error: function (viagemParse, error) {
        console.log(error);
        return error;
      }
    });
  }
}
