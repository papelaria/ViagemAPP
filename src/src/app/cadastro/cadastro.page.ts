import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public username;
  public passwd;
  public nome;
  public sobrenome;
  public email;
  public dtNascimento;
  public telefone;
  public cpf;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {

  }

  async signUp() {
    let user = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.passwd);
    user.set("email", this.email);
    user.set("Nome", this.nome);
    user.set("Sobrenome", this.sobrenome);
    user.set("DataNascimento", this.dtNascimento);
    user.set("Telefone", this.telefone);
    user.set("CPF", this.cpf);

    try {
      await user.signUp();
      this.navCtrl.navigateRoot('/');
    } catch (error) {

      switch (error.code) {
        case 203:
          this.presentError("Email já usado");
          break;
        case 202:
          this.presentError("Nome de usuário já usado");
          break;
        default:
          this.presentError(error.message);
          break;
      }

    }
  }

  async presentError(mensagem: any) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: "bottom"
    });
    (await toast).present();
  }

  ngOnInit() {
  }

}
