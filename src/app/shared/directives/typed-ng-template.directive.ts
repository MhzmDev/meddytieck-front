import { Directive, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[sTypedTemplate]',
})
export class TypedNgTemplateDirective<T> {
  @Input('sTypedTemplate') type?: T;

  static ngTemplateContextGuard<C>(
    dir: TypedNgTemplateDirective<C>,
    ctx: unknown,
  ): ctx is C {
    return true;
  }
}
