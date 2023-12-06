import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_SERVICE, AUTH_STRATEGY, User } from '@ghv/auth';
import { tapOnce } from '@ghv/utils';
import { tap } from 'rxjs';

@Component({
  selector: 'root',
  template: ` <!--  -->
    <ui-shell *ngrxLet="currentUser$; let user" [privateMode]="!!user">
      <div class="header-actions">
        <clr-dropdown *ngIf="user">
          <button
            class="nav-text"
            clrDropdownTrigger
            aria-label="open user profile"
          >
            <cds-icon shape="user"></cds-icon>
            {{ user?.login }}
            <cds-icon shape="caret down"></cds-icon>
          </button>
          <clr-dropdown-menu *clrIfOpen clrPosition="bottom-right">
            <a href="javascript://" clrDropdownItem clrDisabled="true"
              >Preferences</a
            >
            <a (click)="logout()" clrDropdownItem>Log out</a>
          </clr-dropdown-menu>
        </clr-dropdown>
        <ng-template #empty></ng-template>
      </div>
    </ui-shell>`,
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AUTH_SERVICE);
  private authStrategy = inject(AUTH_STRATEGY);

  currentUser$ = this.authService.select('user').pipe(
    tapOnce(() => this.initialNavigation()),
    tap((user) => console.log(user))
  );

  initialNavigation(): void {
    this.authService.isAuthenticated
      ? this.router.navigateByUrl(this.authStrategy.redirectAuthenticated)
      : this.router.navigateByUrl(this.authStrategy.redirectUnauthenticated);
  }

  logout(): void {
    this.authService.logout();
  }
}
