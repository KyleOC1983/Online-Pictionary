import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Message } from '../interfaces/message.interface'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { SocketService } from '../services/socket.service';

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
  
  constructor(private socketService: SocketService, private _snackBar: MatSnackBar, private _ngZone: NgZone) { }

  sendMessage() {
    if (this.messageText.length > 0 && this.messageText.length <= 280 && this.messageText.toLowerCase() == this.answer.toLowerCase()) {
      let msg: Message = {
        displayName: this.displayName,
        body: this.messageText
      }
      this.socketService.sendChat(msg);
      this.messageText = '';

      this._snackBar.open('That is correct!', 'OK', {
        duration: 2000
      });
    }
    else if (this.messageText.length > 0 && this.messageText.length <= 280 && this.messageText.toLowerCase() != this.answer.toLowerCase()) {
      let msg: Message = {
        displayName: this.displayName,
        body: this.messageText
      }
      this.socketService.sendChat(msg);
      this.messageText = '';
    }
    else if (this.messageText.length == 0) {
      this.messageText = '';
      this._snackBar.open('Enter a valid message', 'OK', {
        duration: 2000
      });
    }
  }

  chatScroll(): void {
    try {
      this.chatOutput.nativeElement.scrollTo(0, this.messages.length * 20);
    } catch (err) { }
  }

  onKeydown(event){
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
  }

}
