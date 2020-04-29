import { Injectable } from '@angular/core';
import { Parse } from 'parse'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser() {
    let user: Parse.User;

    user = Parse.User.current();
    
    return user;
  }
}
