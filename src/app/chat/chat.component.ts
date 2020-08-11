import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../interfaces/message.interface'
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('output') private chatOutput: ElementRef;
  messages: Array<Message> = [];
  messageText: string = ''
  displayName: string = ''

  constructor(private chatService: ChatService) { }


  sendMessage(){
    if(this.messageText.length > 0 && this.messageText.length <= 280){
      let msg: Message = {
        username: this.displayName,
        body: this.messageText,
      }
      this.chatService.sendChat(msg);
      this.messageText = '';
    }
  }

  chatScroll(): void {
    try {
        this.chatOutput.nativeElement.scrollTo(0, this.messages.length * 20);
    } catch(err) { }                 
}


  ngOnInit(): void {
  }

}
