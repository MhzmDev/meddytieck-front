import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslationService } from '../../../shared/services/translation/translation.service';
import { Endpoints } from '../../../core/constants/endpoints';
import {
  AuthResponse,
  LoginBody,
  LoginResponse,
  RefreshResponse,
} from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly translationService = inject(TranslationService);

  login(body: LoginBody) {
    return this.http.post<LoginResponse>(Endpoints.tryLogin, {
      ...body,
      rememberMe: true,
      userType: 2,
    });
  }

  // verifyOtp(otp: string, phoneNo: string) {
  //   return this.http.post<AuthResponse>(Endpoints.verifyLogin, {
  //     otp,
  //     phoneNo,
  //   });
  // }

  refreshToken(refreshToken: string) {
    return this.http.post<RefreshResponse>(Endpoints.refreshToken, {
      refreshToken,
    });
  }
}
