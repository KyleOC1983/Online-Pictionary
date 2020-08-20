import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgpSortModule } from "ngp-sort-pipe";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { SketchpadComponent } from './sketchpad/sketchpad.component';
import { GameComponent } from './game/game.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './materialModule';
import { reducers } from './store';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreategameComponent } from './creategame/creategame.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationService } from './services/authentication.service';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    SketchpadComponent,
    GameComponent,
    CreategameComponent,
    ScoreboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgpSortModule
  ],
  providers: [
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
