import {Component, OnInit} from '@angular/core';
import {Team} from "../entities/Team";
import {HttpClient} from "@angular/common/http";
import {ActionType} from "../enums/ActionType";
import {Player} from "../entities/Player";
import {FoosballData} from "../entities/FoosballData";
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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

  oldSelectedPlayers: string[];

  error: string;

  portalPath: string;

  constructor(private http: HttpClient, private fData: FoosballData, private router: Router) {
  }

  ngOnInit() {

    this.portalPath = this.fData.getImageURL();

    var players = this.fData.getPlayers();
    for (let t of players.values()) {
      this.playerList.push(t);
    }

    this.getVoted();

    this.playerList.sort((a, b) => a.faName.localeCompare(b.faName));
  }

  getVoted() {

    this.http.get(this.fData.getSetverPath() + "/api/getVotes")
      .subscribe(
        (val: string[]) => {
          console.log("GET call successful value returned in body for get votes", val);
          this.oldSelectedPlayers = val;
          if (this.oldSelectedPlayers != null) {
            for (let player of this.playerList) {
              if (this.oldSelectedPlayers.indexOf(player.name) != -1) {
                player.followed = true;
              }
            }
          }
        },
        err => {
          console.log("POST call in error for getVoted", err);
          this.error = "شما به اطلاعات دسترسی ندارید";
          this.router.navigate(['/notallowed']);
          this.playerList = [];
        },
        () => {
          console.log("The GET observable is now completed.");
        });
  }

  toggleSelect(player) {
    player.followed = !player.followed;
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
      this.error = "حداقل یک بازیکن را انتخاب کنبد";
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

    this.http.post(this.fData.getSetverPath() + "/api/createVotes", this.followedNameList)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body for create vote",
            val);
          this.error = "";
          this.step = ActionType.ShowResult;
        },
        err => {
          console.log("POST call in error for create vote", err);
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
