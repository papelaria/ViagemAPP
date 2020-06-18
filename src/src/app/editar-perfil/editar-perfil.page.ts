import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Parse } from 'parse';
import { NavController, ToastController } from '@ionic/angular';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  public user;
  public username;
  public nome;
  public sobrenome;
  public email;
  public dtNascimento;
  public telefone;
  public cpf;
  public mudouFoto: boolean = false;
  public imageUri;
  public imagePicker: ImagePicker;
  public navCtrl: NavController;

  constructor(private uService: UserService,
     private _imagePicker: ImagePicker,
      private _navCtrl: NavController,
      public toast: ToastController,
      public imageResizer: ImageResizer) {
    this.imagePicker = _imagePicker;
    this.navCtrl = _navCtrl;
    this.user = uService.getUser();
    this.username = this.user.get('username');
    this.nome = this.user.get('Nome');
    this.sobrenome = this.user.get('Sobrenome');
    this.email = this.user.get('email');
    this.dtNascimento = this.user.get('DataNascimento');
    this.telefone = this.user.get('Telefone');
    this.cpf = this.user.get("CPF");
    //alert('pronto');
    //this.presentError("mensagem");
  }

  public pickImage() {
    try {
      this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.imageUri = results[i];
          let options = {
            uri: this.imageUri,
            quality: 90,
            width: 1280,
            height: 1280,
            base64: true
           } as ImageResizerOptions;

          this.imageResizer.resize(options).then(image => {
            this.imageUri = image;
          });

          alert(this.imageUri);
        }
        this.mudouFoto = true;
      }, (err) => {
        this.presentError(err);
      });
    } catch (ex) {
      this.presentError(ex);
    }
  }

  async saveUser() {
    try {
      this.user.set("Nome", this.nome);
      this.user.set("Sobrenome", this.sobrenome);
      this.user.set("DataNascimento", this.dtNascimento);
      this.user.set("Telefone", this.telefone);
      if (this.mudouFoto) {
        try{
        var file = new Parse.File("imagem.png", { base64: this.imageUri });
        } catch(err){
          this.presentError(err);
        }
        this.user.set("pitcure", file);
      }
      this.user.save().then((result) => {
        this.presentError("Perfil salvo com sucesso!");
        this.navCtrl.navigateRoot('/')
      })
    } catch (err) {
      this.presentError(err);
    }
  }

  ngOnInit() {
  }

  hasReadPermission() {
    this.imagePicker.hasReadPermission().then(function (result) {
      if (!result) {
        this.requestReadPermission();
      }
    })
  }

  requestReadPermission() {
    this.imagePicker.requestReadPermission();
    this.pickImage();
  }

  async presentError(message){
    var toast1 = this.toast.create({
      message: message,
      duration: 3000
    });
    (await toast1).present();
  }

}
