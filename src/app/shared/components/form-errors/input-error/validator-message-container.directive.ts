import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[validatorMessageContainer]',
  standalone: true,
  exportAs: 'validatorMessageContainer',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ValidatorMessageContainer {
  container = inject(ViewContainerRef);
}
