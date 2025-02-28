import { Component } from '@angular/core';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TemplatePreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'facebook_whatsapp_template';
}
