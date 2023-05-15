import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(
    private el: ElementRef,
    private controlName: NgControl,
  ) {}

  ngOnInit() {
    this.controlName.control.parent.valueChanges
      .pipe(
        // calculate the percentage of how 'far' the user's answer is from the correct answer
        map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b)))
      )
      .subscribe((value) => {
        if (value < 0.2) {
          this.el.nativeElement.classList.add('close');
        } else {
          this.el.nativeElement.classList.remove('close');
        }
      })
  }
}
