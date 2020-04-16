import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string;
  private password: string;


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

}
