import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { AuthState } from '../../features/auth/state/auth.state';
import { Store } from '@ngxs/store';

/**
 * A guard that checks if the user is authenticated before allowing access to a route.
 * @returns A boolean indicating whether the user is authenticated or not.
 */
export const signInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const utils = inject(UtilsService);

  const isAdmin = store.selectSnapshot(AuthState.isAdmin);

  if (isAdmin) {
    return true;
  } else {
    utils.isBrowser ? router.navigate(['/']) : router.navigate(['loading']);
    return false;
  }
};
