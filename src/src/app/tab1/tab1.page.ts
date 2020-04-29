import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Parse } from 'parse';
import { UserService } from '../users.service';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public user;
  public userPicture;

  constructor(private navCtrl: NavController, private userSerive: UserService) {
    this.user = this.userSerive.getUser();
    this.userPicture = this.user.get('picture').data.url;
  }

  async getPitcure() {
    try {
      let pic = this.user.get('picture');
      alert(JSON.stringify(pic));
      this.userPicture = pic.data.url;
      alert(this.userPicture);
    } catch(err){
      alert(err);
      alert(this.user.get('picture'));
    }
  }

  postGameScore() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.navigateRoot("/login");
    }, err => {
      console.log('Error logging out', err);
    });
  }

  editarPerfil() {
    try {
      this.navCtrl.navigateRoot("/editar-perfil");
      //alert("trocou");
    } catch (err) {
      alert(err);
    }
  }

}
