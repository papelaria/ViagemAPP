import { Injectable } from '@angular/core';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  readonly apiUrl = "https://parseapi.back4app.com/";
  readonly appId = "fTbYo6sPKFePYjH1HBa5sf2MhM1e0277FpxSow5w";
  readonly jsKey = "nqZvftU75PGh7kRLxwU7BtxlQnyDhB7mbfJ0rXMX";

  result: any;
  const 

  constructor() {

    this.parseInitialize();
    console.log('Initiated Parse');
    
  }

  public addGameScore(newScore): Promise<any> {
    const GameScore = Parse.Object.extend('GameScore');
    
    let gameScore = new GameScore();
    gameScore.set('score', parseInt(newScore.score));
    gameScore.set('playerName', newScore.playerName);
    gameScore.set('cheatMode', false);

    return gameScore.save(null, {
      success: function (gameScore) {
        console.log(gameScore);
        return gameScore;
      },
      error: function (gameScore, error) {
        console.log(error);
        return error;
      }
    });
  }

  public getGameScores(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const GameScore = Parse.Object.extend('GameScore');
        let query = new Parse.Query(GameScore);
        query.skip(offset);
        query.limit(limit);
        query.find().then((gameScores) => {
          resolve(gameScores);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  private parseInitialize() {
    Parse.serverURL = this.apiUrl;
    Parse.initialize(this.appId, this.jsKey);    
  }

}