import {Component, OnInit} from '@angular/core';
import {Team} from "../entities/Team";
import {HttpClient} from "@angular/common/http";
import {ActionType} from "../enums/ActionType";
import {Player} from "../entities/Player";
import {FoosballData} from "../entities/FoosballData";

@Component({
  selector: 'app-follow-players',
  templateUrl: './follow-players.component.html',
  styleUrls: ['./follow-players.component.css']
})
export class FollowPlayersComponent implements OnInit {

  step: ActionType = ActionType.AddRemove;

  playerList: Player[] = [];

  followedPlayerList: Player[] = [];

  followedNameList: string[] = [];

  error: string;

  portalPath: string;

  constructor(private http: HttpClient, private fData: FoosballData) {}

  ngOnInit() {

    this.portalPath = this.fData.getImageURL();

    var players = this.fData.getPlayers();
    for (let t of players.values()) {
      this.playerList.push(t);
    }

    this.playerList.sort((a, b) => a.faName.localeCompare(b.faName));
  }

  save() {

    this.followedPlayerList = [];

    this.followedNameList = [];

    for (let p of this.playerList) {
      if (p.followed) {
        this.followedPlayerList.push(p);
      }
      else {
        const index: number = this.followedPlayerList.indexOf(p);
        if (index !== -1) {
          this.followedPlayerList.splice(index, 1);
        }
      }
    }

    if (this.followedPlayerList.length == 0) {
      this.error = "لطفا حداقل یک بازیکن را انتخاب کنبد";
      return;
    }
    else if (this.followedPlayerList.length > 3) {
      this.error = "فقط سه بازیکن را می توانید انتخاب کنید";
      return;
    }

    this.error = '';

    for (let p of this.followedPlayerList) {
      this.followedNameList.push(p.name);
    }

    console.log(JSON.stringify(this.followedNameList));

    this.http.post("/api/createVote", this.followedNameList)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
          this.error = "";
          this.step = ActionType.ShowResult;
        },
        err => {
          console.log("POST call in error", err);
          this.error = "خطا در فراخوانی سرویس";
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  back() {
    this.step = ActionType.AddRemove;
  }

}
