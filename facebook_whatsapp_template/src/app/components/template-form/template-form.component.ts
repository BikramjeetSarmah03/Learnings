import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderType } from '../../app.component';

@Component({
  selector: 'app-template-form',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css',
})
export class TemplateFormComponent {
  templateForm!: FormGroup;
  headerOptions: IHeaderOptions[] = [];

  @Input() headerType!: HeaderType;
  @Output() headerTypeChange = new EventEmitter<HeaderType>();

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
    this.headerTypeChange.emit(value);
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
