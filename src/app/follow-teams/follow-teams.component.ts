import {Component, OnInit} from '@angular/core';
import {Team} from "../entities/Team";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActionType} from "../enums/ActionType";
import {Player} from "../entities/Player";
import {FoosballData} from "../entities/FoosballData";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient, private fData: FoosballData, private router: Router) {
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

  getVoted() {

    this.http.get(this.fData.getSetverPath() + "/api/getVotes")
      .subscribe(
        (val: string[]) => {
          console.log("GET call successful value returned in body for get votes", val);
          this.oldSelectedTeams = val;
          if (this.oldSelectedTeams != null) {
            for (let team of this.teamList) {
              if (this.oldSelectedTeams.indexOf(team.name) != -1) {
                team.followed = true;
              }
            }
          }
        },
        err => {
          console.log("POST call in error for get votes", err);
          this.error = "شما به اطلاعات دسترسی ندارید";
          this.router.navigate(['/notallowed']);
          this.teamList = [];
        },
        () => {
          console.log("The GET observable is now completed.");
        });
  }

  toggleSelect(team){
    team.followed = !team.followed;
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
      this.error = "حداقل یک تیم را انتخاب کنید";
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

    this.http.post(this.fData.getSetverPath() + "/api/createVotes", this.followedNameList)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body for create votes",
            val);
          this.error = "";
          this.step = ActionType.ShowResult;
        },
        err => {
          console.log("POST call in error for create votes", err);
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
