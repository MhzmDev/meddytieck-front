import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  NgForm,
  NgModel,
} from '@angular/forms';
import {
  EMPTY,
  fromEvent,
  iif,
  merge,
  skip,
  startWith,
  Subscription,
} from 'rxjs';
import { ErrorStateMatcher } from './input-error/error-state-matcher.service';
import { InputErrorComponent } from './input-error/input-error.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])
  `,
  standalone: true,
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicValidatorMessage implements OnInit, OnDestroy {
  ngControl =
    inject(NgControl, { self: true, optional: true }) ||
    inject(ControlContainer, { self: true });
  elementRef = inject(ElementRef);

  get form() {
    return this.parentContainer?.formDirective as
      | NgForm
      | FormGroupDirective
      | null;
  }

  @Input()
  errorStateMatcher = inject(ErrorStateMatcher);

  @Input()
  container = inject(ViewContainerRef);

  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private errorMessageTrigger!: Subscription;
  private parentContainer = inject(ControlContainer, { optional: true });

  ngOnInit() {
    queueMicrotask(() => {
      if (!this.ngControl.control)
        throw Error(`No control model for ${this.ngControl.name} control...`);
      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iif(() => !!this.form, this.form?.ngSubmit as EventEmitter<any>, EMPTY),
      )
        .pipe(
          startWith(this.ngControl.control.status),
          skip(this.ngControl instanceof NgModel ? 1 : 0),
        )
        .subscribe(() => {
          if (
            this.errorStateMatcher.isErrorVisible(
              this.ngControl.control,
              this.form,
            )
          ) {
            if (!this.componentRef) {
              this.componentRef =
                this.container.createComponent(InputErrorComponent);
              this.componentRef.changeDetectorRef.markForCheck();
            }
            this.componentRef.setInput('errors', this.ngControl.errors);
          } else {
            this.componentRef?.destroy();
            this.componentRef = null;
          }
        });
    });
  }

  ngOnDestroy() {
    this.errorMessageTrigger.unsubscribe();
  }
}
