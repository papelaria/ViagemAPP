import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ParseService } from '../parse.service';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private uService : UsersService, private serviceBase : ParseService, private navCtrl: NavController) {

      var user = uService.getUser();
      if(!user){
        this.navCtrl.navigateRoot("/login");
      }

  }

}
