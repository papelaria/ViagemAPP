import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Parse } from 'parse';
import { UserService } from '../users.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public user;
  public userPicture;
  public notifica = [
    "Notificação teste",
    "Notificação 2"
  ]

  constructor(private navCtrl: NavController, private userService: UserService) {
    try{
    this.user = this.userService.getUser();
    if(this.user.get('pitcure') != undefined)
      this.userPicture = this.user.get('pitcure').url();
      //alert(this.user.get('pitcure').url());
    } catch(err){
      alert(err);
    }
  }

  async getPitcure() {
    try {
      let pic = this.user.get('pitcure');
      //alert(JSON.stringify(pic));
      if(pic != undefined)
        this.userPicture = pic.url();
      //alert(this.userPicture);
    } catch(err){
      alert(err);
      //alert(this.user.get('picture'));
    }
  }

  logout(){
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
      //alert(err);
    }
  }

}
