import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Parse } from 'parse';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  public user;

  constructor(private uService: UserService, private imagePicker: ImagePicker) {
    this.user = uService.getUser();
    //alert(this.user.get('pitcure').url());
  }

  public pickImage() {
    this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        if (results[i] !== 0)
          this.saveUser(results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }

  async saveUser(uri) {
    try {
      var file = new Parse.ParseFile('picture', uri);
      await file.save().then((photo) => {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + photo);
        this.user.set('picture', photo);
        this.user.save().then(usr => {
          alert("user saved");
        });
      });
    } catch (err) {
      alert(err);
    }
  }

  ngOnInit() {
  }

}
