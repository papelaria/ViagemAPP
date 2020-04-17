import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Facebook } from '@ionic-native/facebook/ngx'
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string;
  private password: string;
  private facebook = new Facebook();


  constructor(private toastCtrl : ToastController, private navCtrl : NavController) { }

  ngOnInit() {
  }

  signIn(){
    Parse.User.logIn(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);
      this.navCtrl.navigateRoot('/')
    }, err => {
      console.log('Error logging in', err); 
      if(err.code == -1){
        this.presentError("Preencha os dados de login!");
      } else if(err.code == 101){
        this.presentError("Usuário ou senha inválido!")
      }
    });
  }

  async presentError(mensagem: any){
    const toast = this.toastCtrl.create({
      message:mensagem,
      duration: 3000,
      position: "bottom"
    });
    (await toast).present();
  }

  signUp(){
    this.navCtrl.navigateRoot('/cadastro');
  }

  async facebookLogin() {
    try {
      // Log in to Facebook and request user data
      let facebookResponse = await this.facebook.login(['public_profile', 'email']);
      let facebookAuthData = {
        id: facebookResponse.authResponse.userID,
        access_token: facebookResponse.authResponse.accessToken,
      };

      // Request the user from parse
      let toLinkUser = new Parse.User();
      let user = await toLinkUser._linkWith('facebook', {authData: facebookAuthData});

      // If user did not exist, updates its data
      if (!user.existed()) {
        let userData = await this.facebook.api('me?fields=id,name,email,first_name,last_name,birthday,picture.width(720).height(720).as(picture)', []);
        user.set('username', userData.name);
        user.set('Nome', userData.first_name);
        user.set('Sobrenome', userData.last_name);
        user.set('DataNascimento', userData.birthday);
        user.set('email', userData.email);
        await user.save();
      }

      this.navCtrl.navigateRoot('/')
    } catch (err) {
      console.log('Error logging in', err);

      this.presentError(err.message);
    }
  }

}
