import {Component, OnInit} from '@angular/core';
import {Team} from "../entities/Team";
import {HttpClient} from "@angular/common/http";
import {ActionType} from "../enums/ActionType";
import {Player} from "../entities/Player";
import {FoosballData} from "../entities/FoosballData";

@Component({
  selector: 'app-follow-teams',
  templateUrl: './follow-teams.component.html',
  styleUrls: ['./follow-teams.component.css']
})

export class FollowTeamsComponent implements OnInit {

  step: ActionType = ActionType.AddRemove;

  playerList: Player[] = [];

  teamList: Team[] = [];

  followedTeamList: Team[] = [];

  followedNameList: string[] = [];

  oldSelectedTeams: string[];

  error: string;

  portalPath: string;

  constructor(private http: HttpClient, private fData: FoosballData) {
  }

  ngOnInit() {

    this.portalPath = this.fData.getImageURL();

    var teams = this.fData.getTeams();
    for (let t of teams.values()) {
      this.teamList.push(t);
    }

    this.getVoted();

    this.teamList.sort((a, b) => a.faName.localeCompare(b.faName));
  }

  getVoted(){
    this.http.get(this.fData.getSetverPath() + "/api/getVotes")
      .subscribe(
        (val: string[]) => {
          console.log("POST call successful value returned in body111vvvddd", val);
          this.oldSelectedTeams = val;
          for(let team of this.teamList){
            if(this.oldSelectedTeams.indexOf(team.name) != -1){
              team.followed = true;
            }
          }
          console.log("POST call successful value returned in ddddddd", this.oldSelectedTeams);
        },
        err => {
          console.log("POST call in error", err);
          this.error = "خطا در فراخوانی سرویس";
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  save() {

    this.followedTeamList = [];

    this.followedNameList = [];

    for (let t of this.teamList) {
      if (t.followed) {
        this.followedTeamList.push(t);
      }
      else {
        const index: number = this.followedTeamList.indexOf(t);
        if (index !== -1) {
          this.followedTeamList.splice(index, 1);
        }
      }
    }

    if (this.followedTeamList.length == 0) {
      this.error = "لطفا حداقل یک تیم را انتخاب کنید";
      return;
    }
    else if (this.followedTeamList.length > 3) {
      this.error = "فقط 3 تیم را می توانید انتخاب کنید";
      return;
    }

    this.error = '';

    for (let t of this.followedTeamList) {
      this.followedNameList.push(t.name);
    }

    console.log(JSON.stringify(this.followedNameList));



    console.log("1111" + this.oldSelectedTeams);

    this.http.post(this.fData.getSetverPath() + "/api/createVotes", this.followedNameList)
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
