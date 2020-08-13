import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
