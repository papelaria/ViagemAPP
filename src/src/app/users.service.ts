import { Injectable } from '@angular/core';
import { Parse } from 'parse'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUser() {
    let user;

    user = Parse.User.current();

    return user;
  }
}
