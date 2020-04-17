import { Component } from '@angular/core';
import { ParseService } from '../parse.service';
import { UsersService } from '../users.service';
import { NavController } from '@ionic/angular';
import { Parse } from 'parse';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  text = "hello";
  newScore = { playerName: null, score: null };
  gameScores = [];

  constructor(private navCtrl: NavController) {
    
  }

   public postGameScore() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.navigateRoot("/login");
    }, err => {
      console.log('Error logging out', err);
   });
  }

}
