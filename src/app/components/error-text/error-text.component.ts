import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-error-text',
  imports: [CommonModule],
  templateUrl: './error-text.component.html',
  styleUrl: './error-text.component.scss',
})
export class ErrorTextComponent {
  @Input() errorMessage: string = '';
  @Input() isShowError: boolean | undefined = false;
}
