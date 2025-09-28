// import { Component } from '@angular/core';
// import { ChatService } from '../../services/chat.service';

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent {
//   messages: { user: string, bot: string }[] = [];
//   userInput = '';
//   selectedFile: File | null = null;

//   constructor(private chatService: ChatService) {}

//   send() {
//     const message = this.userInput.trim();
//     if (!message) return;

//     this.messages.push({ user: message, bot: '' });
//     this.userInput = '';

//     this.chatService.sendMessage(message).subscribe(res => {
//       this.messages[this.messages.length - 1].bot = res.reply;
//     });
//   }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   upload() {
//     if (!this.selectedFile) return;
//     this.chatService.uploadDocument(this.selectedFile).subscribe(res => {
//       alert(res.message);
//       this.selectedFile = null;
//     });
//   }
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // for [(ngModel)]
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ make sure CommonModule & FormsModule are here
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { user: string, bot: string }[] = [];
  userInput = '';
  selectedFile: File | null = null;

  constructor(private chatService: ChatService) {}

  send() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ user: message, bot: '' });
    this.userInput = '';

    this.chatService.sendMessage(message).subscribe(res => {
      this.messages[this.messages.length - 1].bot = res.reply;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) return;
    this.chatService.uploadDocument(this.selectedFile).subscribe(res => {
      alert(res.message);
      this.selectedFile = null;
    });
  }
}
