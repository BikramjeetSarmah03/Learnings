import { CommonModule, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { HeaderType } from '../../app.component';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [DatePipe, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './template-preview.component.html',
  styleUrl: './template-preview.component.css',
})
export class TemplatePreviewComponent {
  @Input() headerType!: HeaderType;
}
