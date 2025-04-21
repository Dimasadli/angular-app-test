import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'component-label',
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent {
  @Input() title: string = 'Label Text';
}
