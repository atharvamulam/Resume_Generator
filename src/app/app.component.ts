import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Configuration, OpenAIApi, CreateChatCompletionRequest } from "openai";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  resumeData: any = {}; // Store resume form data
  chatMessages: any[] = []; // Store chat messages
  generatedText: string = ''; // Store generated resume text
  title = 'crud';
  resumeForm: any;
  openai: OpenAIApi;
  apiKey: string | undefined;
  constructor(private formBuilder: FormBuilder, private chatService: CommonService) {
    this.resumeForm = this.formBuilder.group({
      name: ['', Validators.required],
      skills: ['', Validators.required],
      education: ['', Validators.required]
    });

    const configuration = new Configuration({
      apiKey: environment.openaiApiKey,
    });
    
    this.openai = new OpenAIApi(configuration);
  }



  async generateChatCompletion(): Promise<void> {
    
    try {
      const chatCompletionRequest: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello world' },
        ],
      };
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      };
  
      const completion = await this.openai.createChatCompletion(chatCompletionRequest, { headers });
      console.log('raman', completion.data.choices[0].message);
    } catch (error) {
      console.error('Error ', error);
    }
  }
  

  onSubmit() {
    if (this.resumeForm.invalid) {
      // Handle form validation errors
      return;
    }
  
    const formValues = this.resumeForm.value;
    // Generate resume using formValues
  
    // Send user message to ChatGPT
    const userMessage = `Generate attractive text for my resume using this information: ${formValues}`;
    this.chatMessages.push({ sender: 'user', message: userMessage });
  
    this.chatService.sendMessage(userMessage).subscribe(response => {
      // Handle the chat response
      const chatResponse = response.choices[0].text.trim();
      this.chatMessages.push({ sender: 'bot', message: chatResponse });
      console.log('api',response)
      // Append chat response to generated text
      this.generatedText += chatResponse;
    });
  }
  
}
