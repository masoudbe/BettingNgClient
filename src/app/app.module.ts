import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FollowTeamsComponent} from './follow-teams/follow-teams.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {FollowPlayersComponent} from './follow-players/follow-players.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';

const routes: Routes = [
  {path: 'teams', component: FollowTeamsComponent},
  {path: 'players', component: FollowPlayersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FollowTeamsComponent,
    FollowPlayersComponent,
    NotAllowedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
