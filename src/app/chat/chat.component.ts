import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Message } from '../interfaces/message.interface'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { DisplaynamestoreService } from '../services/displaynamestore.service';
import { GameInfo } from '../interfaces/gameInfo.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('output') private chatOutput: ElementRef;
  gameInfo: GameInfo
  messages: Array<Message> = [];
  messageText: string = '';
  displayName: string = '';
  answer: string = '';
  currentGame: string;
  player: string;
  isArtist: boolean = false;
  currentPlayer;


  constructor(private socketService: SocketService, private _snackBar: MatSnackBar,
    private _ngZone: NgZone, private gameService: GameService, private actr: ActivatedRoute, private displayNameStore: DisplaynamestoreService) { }

  sendMessage() {
    if (this.messageText.length > 0 && this.messageText.length <= 280) {
      if (this.messageText.toLowerCase().includes(this.answer.toLowerCase())) {
        this.socketService.win()
        this._snackBar.open('That is correct!', 'OK', {
          duration: 2000
        });
      }
      let msg: Message = {
        displayName: this.displayName,
        body: this.messageText
      }
      this.socketService.sendChat(msg);
      this.messageText = '';
    }
  }

  chatScroll(): void {
    try {
      this.chatOutput.nativeElement.scrollTo(0, this.messages.length * 20);
    } catch (err) { }
  }

  onKeydown(event) {
    event.preventDefault();
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  ngOnInit(): void {
    // this.auth.user.subscribe(user => this.displayName = user ? user.displayName : '');
    this.socketService.chatMessage$.subscribe(msg => {
      this.messages.push(msg)
      setTimeout(this.chatScroll.bind(this), 50)
    });
    this.currentGame = this.actr.snapshot.params.gameId;
    this.displayNameStore.player$.subscribe(val=> this.currentPlayer = val)
    
    this.currentGame = this.actr.snapshot.params.gameId;
    this.gameService.gameInfo(this.currentGame).subscribe((val: any) => {
    
      this.answer = val.currentTopic;
    
      if(this.currentPlayer == val.currentArtist.displayName){
    
        this.isArtist = true;
      } else{
    
        this.isArtist = false;
      }
    })
  }

}
