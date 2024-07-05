import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  username = 'Oumaima';

  // bread crumb items
  breadCrumbItems: Array<{}>;

  chatMessagesData: { name: string, message: string, time: string, align?: string }[] = [];

  formData: FormGroup;

  // Form submit
  chatSubmit: boolean;

  private apiUrl = 'http://localhost:8181/chatbot/ask'; // Adjust the API URL if needed

  predefinedQuestions: string[] = [
    "Bonjour",
    "Adresse ?",
    "Contact ?",
    "Sites Web et liens sociaux ?"
  ];

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Chat', active: true }];

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.onListScroll();
  }

  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  askQuestion(question: string) {
    let params = new HttpParams().set('question', question);
    return this.http.get(this.apiUrl, { params, responseType: 'text' });
  }

  /**
   * Handle predefined question click
   */
  onPredefinedQuestionClick(question: string) {
    const currentDate = new Date();
    this.chatMessagesData.push({
      align: 'right',
      name: 'Moi',
      message: question,
      time: currentDate.getHours() + ':' + currentDate.getMinutes()
    });
    this.onListScroll();

    this.askQuestion(question).subscribe(response => {
      this.chatMessagesData.push({
        name: 'Chatbot',
        message: response,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });
      this.onListScroll();
    });
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // User's message
      this.chatMessagesData.push({
        align: 'right',
        name: 'Henry Wells',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });
      this.onListScroll();

      // Call the chat service to get the response
      this.askQuestion(message).subscribe(response => {
        this.chatMessagesData.push({
          name: 'Chatbot',
          message: response,
          time: currentDate.getHours() + ':' + currentDate.getMinutes()
        });
        this.onListScroll();
      });

      // Reset Form Data
      this.formData.reset();
    }

    this.chatSubmit = true;
  }
}
