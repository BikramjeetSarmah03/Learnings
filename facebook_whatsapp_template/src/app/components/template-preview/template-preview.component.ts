import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './template-preview.component.html',
  styleUrl: './template-preview.component.css',
})
export class TemplatePreviewComponent {}
