import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[sTemplate]',
})
export class mtkTemplateDirective<CT = unknown> {
  @Input({ alias: 'sTemplate', required: true }) name?: string;
  @Input({ required: true }) contextType?: CT;

  readonly template: TemplateRef<CT> = inject(TemplateRef);

  getType(): string {
    return this.name || '';
  }

  static ngTemplateContextGuard<C>(
    dir: mtkTemplateDirective<C>,
    ctx: unknown,
  ): ctx is C {
    return true;
  }
}
