import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../interfaces/message.interface'
import { ChatService } from '../services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('output') private chatOutput: ElementRef;
  messages: Array<Message> = [];
  messageText: string = '';
  displayName: string = '';
  answer = "generic answer";

  constructor(private chatService: ChatService, private _snackBar: MatSnackBar) { }


  sendMessage() {
    if (this.messageText.length > 0 && this.messageText.length <= 280 && this.messageText == this.answer) {
      let msg: Message = {
        username: this.displayName,
        body: this.messageText
      }
      this.chatService.sendChat(msg);
      this.messageText = '';
      this._snackBar.open('That is correct!', 'OK', {
        duration: 2000,
      });
    }
    else if(this.messageText.length > 0 && this.messageText.length <= 280 && this.messageText != this.answer) {
      let msg: Message = {
        username: this.displayName,
        body: this.messageText
      }
      this.chatService.sendChat(msg);
      this.messageText = '';
      this._snackBar.open('That is incorrect :(', 'OK', {
        duration: 2000,
      });
    }
  }

  chatScroll(): void {
    try {
      this.chatOutput.nativeElement.scrollTo(0, this.messages.length * 20);
    } catch (err) { }
  }




  ngOnInit(): void {
  }

}
