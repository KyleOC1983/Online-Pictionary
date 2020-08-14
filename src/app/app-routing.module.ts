import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { CreategameComponent } from './creategame/creategame.component';
import { AngularFireAuthGuard} from '@angular/fire/auth-guard';
import { JoinGameGuard } from './guards/join-game.guard';


const routes: Routes = [
  {path: 'game/:gameId', component: GameComponent, canActivate: [JoinGameGuard]},
  {path: 'home', component: HomeComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'creategame', component: CreategameComponent, canActivate: [AngularFireAuthGuard]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
