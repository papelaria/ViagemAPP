import { Component } from '@angular/core';
import { UserService } from '../users.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public local: string;
  public data =  new Date().toISOString();;
  public viagens;
  public dataAtual: String = new Date().toISOString();

  constructor(public userService: UserService, public toast: ToastController) {
    this.userService.getViagens().then(travels =>{
      this.viagens = travels;
    });
  }

  cadastrarViagem(){
    this.userService.addViagem({local: this.local, data: this.data}).then(viagem => {
      this.local = "";
      this.data = new Date().toISOString();
      this.userService.getViagens().then(travels =>{
        this.viagens = travels;
      });
      this.presentError("Viagem para " + viagem.get("Local") + " agendada");
    });
  }

  async presentError(message){
    var toast1 = this.toast.create({
      message: message,
      duration: 3000
    });
    (await toast1).present();
  }

}
