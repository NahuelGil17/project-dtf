import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../../features/auth/state/auth.state';
import { Store } from '@ngxs/store';
import { UtilsService } from '../services/utils.service';

/**
 * A guard that checks if the user is authenticated before allowing access to a route.
 * @returns A boolean indicating whether the user is authenticated or not.
 */
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const utils = inject(UtilsService);

  const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);

  if (isAuthenticated) {
    utils.isBrowser ? router.navigate(['/']) : router.navigate(['loading']);
    return false;
  } else {
    return true;
  }
};
