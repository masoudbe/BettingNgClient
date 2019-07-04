import {Player} from "./Player";

export class Team {

  constructor(public name: string, public faName: string, public followed: boolean, public players: Player[]) {
    this.players = [];
  }

  get playerNames(): string {
    var playerName: string = "";
    for (let p of this.players) {
      playerName += p.faName + "-";
    }

    return playerName.substring(0, playerName.length - 1);
  }
}
