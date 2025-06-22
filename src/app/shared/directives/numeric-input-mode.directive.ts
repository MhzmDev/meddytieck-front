import { Directive, ElementRef, inject, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[mtkNumericInputMode]',
  standalone: true,
})
export class NumericInputModeDirective implements AfterViewInit {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngAfterViewInit() {
    const inputs = this.el.nativeElement.querySelectorAll('input');
    inputs.forEach((input) => {
      input.setAttribute('inputmode', 'numeric');
      input.setAttribute('pattern', '[0-9]*');
    });
  }
}
