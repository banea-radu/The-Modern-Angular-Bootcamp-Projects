import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title = '';
  @Input() imageUrl = '';
  @Input() content = '';
  @Input() username = '';
  valueToConvert: string ='';

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueToConvert = input.value;
  }
}
