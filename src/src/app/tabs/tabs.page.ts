import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ParseService } from '../parse.service';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private parseService: ParseService, private uService: UsersService, private navCtrl: NavController) {
    //private uService : UsersService, private serviceBase : ParseService, private router: Router
    var user = uService.getUser();
    if (!user) {
      this.navCtrl.navigateRoot("/login");
    }

  }

}
