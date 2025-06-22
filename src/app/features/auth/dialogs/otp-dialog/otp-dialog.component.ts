import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputOtp } from 'primeng/inputotp';
import { Button } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NumericInputModeDirective } from '../../../../shared/directives/numeric-input-mode.directive';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'mtk-otp-dialog',
  imports: [
    Dialog,
    InputOtp,
    Button,
    ReactiveFormsModule,
    TranslatePipe,
    NumericInputModeDirective,
  ],
  templateUrl: './otp-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpDialogComponent {
  readonly visible = model.required<boolean>();
  readonly phone = input<string | null>();
  readonly resendOtp = output();
  readonly verifyOtp = output<string>();

  readonly authStore = inject(AuthStore);
  readonly timeLeft = signal('1:00');
  readonly resendDisabled = computed(() => this.timeLeft() !== '00:00');
  readonly form = new FormGroup({
    otp: new FormControl(null as string | null, [Validators.required]),
  });

  constructor() {
    this.calculateLeftTime();
  }

  onVerifyOtp() {
    if (this.form.invalid) return;
    this.verifyOtp.emit(this.form.controls.otp.value as string);
  }

  onResendOtp() {
    this.resendOtp.emit();
    this.calculateLeftTime();
  }

  calculateLeftTime() {
    this.timeLeft.set('1:00');
    const timer = setInterval(() => {
      this.timeLeft.update((time) => {
        let [minutes, seconds] = time.split(':').map(Number);

        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return '00:00'; // Stop at 0
        }

        if (seconds === 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }

        // Pad with zero if needed
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');
        return `${m}:${s}`;
      });
    }, 1000);
  }
}
