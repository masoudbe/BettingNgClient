import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FollowPlayersComponent} from "./follow-players/follow-players.component";
import {FollowTeamsComponent} from "./follow-teams/follow-teams.component";
import {NotAllowedComponent} from "./not-allowed/not-allowed.component";

const routes: Routes = [
  {path: 'teams', component: FollowTeamsComponent},
  {path: 'players', component: FollowPlayersComponent},
  {path: 'notallowed', component: NotAllowedComponent},
  {path: '', redirectTo: '/teams', pathMatch: 'full'},
  {path: '**', redirectTo: '/teams', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
