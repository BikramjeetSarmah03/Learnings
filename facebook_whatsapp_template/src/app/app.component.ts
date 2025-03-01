import { Component, signal } from '@angular/core';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TemplatePreviewComponent, TemplateFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedHeaderType = signal<HeaderType>('NONE');

  onHeaderTypeChange(newType: HeaderType) {
    this.selectedHeaderType.set(newType);
  }
}

export type HeaderType = 'NONE' | 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
