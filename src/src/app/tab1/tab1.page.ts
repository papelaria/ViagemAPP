import { Component } from '@angular/core';
import { ParseService } from '../parse.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  text = "hello";
  newScore = { playerName: null, score: null };
  gameScores = [];

  constructor(private pService : ParseService) {
    this.listScores();
  }

  public listScores(): Promise<any> {
    let offset = this.gameScores.length;
    let limit = 10;
    return this.pService.getGameScores(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.gameScores.push(object);
      }
    }, (error) => {
      console.log(error);
    });
  }

  public postGameScore() {
    this.pService.addGameScore(this.newScore).then((gameScore) => {
      this.gameScores.push(gameScore);
      this.newScore.playerName = null;
      this.newScore.score = null;
    }, (error) => {
      console.log(error);
      alert('Error adding score.');
    });
  }

}
