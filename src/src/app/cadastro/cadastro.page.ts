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
  userGroup: FormGroup;

  // validation_messages = {
  //   'username': [
  //     { type: 'required', message: 'Campo Obrigatório!' },
  //     { type: 'minlength', message: 'O nome de usuário precisa ter pelo menos 5 caracteres!' },
  //     { type: 'maxlength', message: 'O nome de usuário precisa ter no máximo 25 caracteres!' },
  //     { type: 'pattern', message: 'Seu nome de usuário deve conter apenas números e letras!' }
  //   ],
  //   'nome': [{ type: 'required', message: 'Campo Obrigatório' }],
  //   'passwd': [{ type: 'required', message: 'Campo Obrigatório' }],
  //   'sobrenome': [{ type: 'required', message: 'Campo Obrigatório' }],
  //   'email': [{ type: 'required', message: 'Campo Obrigatório' }],
  //   'dtNascimento': [{ type: 'required', message: 'Campo Obrigatório' }],
  //   'telefone': [{ type: 'required', message: 'Campo Obrigatório' }],
  //   'cpf': [{ type: 'required', message: 'Campo Obrigatório' }]
  // }

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {

    // this.userGroup = new FormGroup({
    //   nome: new FormControl(Validators.required),
    //   sobrenome: new FormControl(Validators.required),
    //   username: new FormControl(Validators.compose([
    //     Validators.maxLength(25),
    //     Validators.minLength(5),
    //     Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    //     Validators.required
    //   ])),
    //   passwd: new FormControl(Validators.required),
    //   email: new FormControl(Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   dtNascimento: new FormControl(Validators.required),
    //   telefone: new FormControl(Validators.required),
    //   cpf: new FormControl(Validators.required)
    // });

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
