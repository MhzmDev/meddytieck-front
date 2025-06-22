import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formError]',
  standalone: true,
})
export class FormErrorDirective {
  templateRef = inject(TemplateRef);
  vcr = inject(ViewContainerRef);
}
