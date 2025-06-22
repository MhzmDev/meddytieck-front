import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (state.url.includes('auth')) {
    if (authStore.isAuthenticated()) {
      router.navigate(['/']).then();
      return false;
    }
    return true;
  }
  if (authStore.isAuthenticated()) {
    return true;
  }
  router.navigate(['/auth']).then();
  return false;
};
