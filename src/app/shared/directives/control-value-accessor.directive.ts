import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  inject,
  Injector,
  Provider,
  signal,
  Type,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export abstract class ControlValueAccessorBase<T>
  implements ControlValueAccessor, AfterViewInit
{
  private _value: T | null = null;
  private readonly injector = inject(Injector);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  ngControl?: NgControl | null;
  onChange?: (value: T | null) => void;
  onTouched?: () => void;
  disabled = signal(false);

  readonly id = signal<string>(Date.now().toString(16).substring(2, 15));
  readonly control = new FormControl<T | null>(null);

  @HostBinding('class.ng-invalid') get isInvalid() {
    return this.ngControl?.control?.invalid;
  }

  @HostBinding('class.ng-touched') get isTouched() {
    return this.ngControl?.control?.touched;
  }

  get value(): T | null {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange?.(value);
    this.onTouched?.();
  }

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.value = value;
    });
  }

  ngAfterViewInit() {
    this.ngControl = this.injector.get(NgControl, undefined, {
      optional: true,
    });

    const control = this.ngControl?.control;
    const input = this.elementRef?.nativeElement.querySelector(
      'input,textarea',
    ) as HTMLElement;

    if (control && input) {
      // Initial state
      this.syncControlClasses(control, input);

      // Listen to statusChanges
      control.statusChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.syncControlClasses(control, input));
    }
  }

  private syncControlClasses(control: AbstractControl, input: HTMLElement) {
    const classes = [
      'ng-valid',
      'ng-invalid',
      'ng-touched',
      'ng-untouched',
      'ng-dirty',
      'ng-pristine',
    ];

    // Remove all old classes
    input.classList.remove(...classes);

    // Apply current state
    if (control.valid) input.classList.add('ng-valid');
    if (control.invalid) input.classList.add('ng-invalid');
    if (control.touched) input.classList.add('ng-touched');
    if (control.untouched) input.classList.add('ng-untouched');
    if (control.dirty) input.classList.add('ng-dirty');
    if (control.pristine) input.classList.add('ng-pristine');
  }

  writeValue(value: T | null): void {
    this._value = value;
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  // errorMessages: { [key: string]: (errorValue: any) => string } = {
  //   required: () => 'validations.required',
  //   minlength: (error) => 'validations.minLength',
  //   maxlength: (error) => 'validations.maxLength',
  //   min: (error) => 'validations.min',
  //   max: (error) => 'validations.max',
  //   invalidIban: (error) => 'validations.invalidIban',
  //   bannedName: (error) => error?.value || 'validations.bannedName',
  //   pattern: (e) => {
  //     if (String(e.requiredPattern) === String(ARABIC_REGEX)) return 'validations.arabic';
  //     if (String(e.requiredPattern) === String(ENGLISH_REGEX)) return 'validations.english';
  //     if (String(e.familyFundPattern) === String(ARABIC_REGEX))
  //       return 'validations.family-fund-arabic';
  //
  //     return 'validations.pattern';
  //   },
  //   email: () => 'validations.email',
  //   onlySpaces: () => 'validations.onlySpaces',
  //   startAfterEnd: () => 'validations.startAfterEnd',
  //   endBeforeStart: () => 'validations.endBeforeStart'
  // };
  //
  // getErrorMessage(errorKey: string, errorValue: any): string {
  //   const message = this.errorMessages[errorKey];
  //   return message ? message(errorValue) : 'validations.invalid';
  // }
}

export function provideValueAccessor<T>(type: Type<T>): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}

export function provideValidator<T>(type: Type<T>): Provider {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
