import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { UiDialogService } from '@workspace/shared/ui';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { AuthServiceIntf } from '../models';
import { AUTH_SERVICE } from '../tokens/auth.tokens';

@Injectable()
export class SimpleGuard implements CanActivateChild, CanLoad {
  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthServiceIntf,
    private router: Router,
    private dialogService: UiDialogService
  ) {}
  canActivateChild(
    next: ActivatedRouteSnapshot
    // state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.authState$.pipe(
      distinctUntilChanged(),
      map((state) => Boolean(state.user)),
      tap((authed) => {
        if (!authed) {
          this.dialogService.showAlert({
            id: '',
            type: 'danger',
            text: 'You must be authorized to visit Planets',
          });
          this.router.navigateByUrl('/login');
        }
      }),
      take(1)
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState$.pipe(
      distinctUntilChanged(),
      map((state) => Boolean(state.user)),
      take(1)
    );
  }
}
