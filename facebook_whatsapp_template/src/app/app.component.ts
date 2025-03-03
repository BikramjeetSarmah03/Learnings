import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TemplatePreviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  templateForm!: FormGroup;
  headerOptions: IHeaderOptions[] = [];
  selectedHeaderType: HeaderType = 'NONE';

  constructor(private readonly fb: FormBuilder) {
    this.headerOptions = headerOptions;
  }

  ngOnInit() {
    this.createTemplateForm();
  }

  createTemplateForm() {
    this.templateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(512)]],

      header: this.fb.group({
        format: ['NONE'],
        text: [''],
      }),

      body: this.fb.group({
        text: [''],
      }),

      footer: this.fb.group({
        text: [''],
      }),

      buttons: this.fb.array([]),
    });
  }

  onChangeHeader(value: HeaderType) {
    this.templateForm.patchValue({
      header: {
        format: value,
      },
    });
    this.selectedHeaderType = value;
  }

  selectedHeader() {
    return (
      headerOptions.find(
        (option) =>
          option.type === this.templateForm.get(['header', 'format'])?.value
      )?.title || 'None'
    );
  }

  get buttons(): FormArray {
    return this.templateForm.get('buttons') as FormArray;
  }

  addButton() {
    this.buttons.push(
      this.fb.group({
        type: ['', Validators.required],
        phone_number: [''],
        url: this.fb.group({
          base_url: [''],
          url_suffix_example: [''],
        }),
      })
    );
  }

  removeButton(index: number) {
    this.buttons.removeAt(index);
  }

  formatTemplateName() {
    const value =
      (this.templateForm.get('name')?.value as string) || 'your_template_name';

    return value.replaceAll(' ', '_').toLowerCase();
  }

  onSubmit() {
    console.log(this.templateForm.value);
  }
}

export type HeaderType = 'NONE' | 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';

type IHeaderOptions = {
  id: number;
  type: HeaderType;
  title: string;
  icon: string;
};

let headerOptions: IHeaderOptions[] = [
  {
    id: 1,
    type: 'TEXT',
    title: 'Text',
    icon: 'text-outline',
  },
  {
    id: 2,
    type: 'IMAGE',
    title: 'Image',
    icon: 'image',
  },
  {
    id: 3,
    type: 'VIDEO',
    title: 'Video',
    icon: 'play-circle',
  },
  {
    id: 4,
    type: 'DOCUMENT',
    title: 'Document',
    icon: 'document-text',
  },
];
