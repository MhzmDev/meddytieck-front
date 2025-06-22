import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { Button } from 'primeng/button';
// import { OtpDialogComponent } from '../../dialogs/otp-dialog/otp-dialog.component';
import { AuthStore } from '../../store/auth.store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicValidatorMessage } from '../../../../shared/components/form-errors/dynamic-validator-message.directive';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LoginBody } from '../../services/auth.model';

@Component({
  selector: 'mtk-login',
  imports: [
    ImageComponent,
    IconComponent,
    InputComponent,
    Button,
    // OtpDialogComponent,
    ReactiveFormsModule,
    DynamicValidatorMessage,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly form = new FormGroup({
    userNameEmail: new FormControl(null as string | null, [
      Validators.required,
    ]),
    userPass: new FormControl(null as string | null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    await this.authStore.login(
      this.form.getRawValue() as LoginBody,
    );
    if (this.authStore.isLoginFulfilled()) {
      this.router.navigate(['/']).then();
    }
  }

  onResendOtp() {
    this.authStore
      .login(this.form.getRawValue() as LoginBody)
      .then();
  }

  // async onVerifyOtp(otp: string) {
  //   await this.authStore.verifyOtp(
  //     otp,
  //     this.form.getRawValue() as LoginBody,
  //   );
  //   if (this.authStore.isAuthFulfilled()) {
  //     this.showOtpDialog.set(false);
  //     this.router.navigate(['/']).then();
  //   }
  // }
}
