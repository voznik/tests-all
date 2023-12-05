import { Component, Inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { REGEXPS } from '@ghv/utils';
import { User } from '../../models';
import { AUTH_REDIRECT, AUTH_SERVICE, AuthService } from '../../services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild(ClrForm) private clrForm!: ClrForm;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loginForm = new FormGroup<ControlsOf<User>>({
    token: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(REGEXPS.accessToken),
    ]),
  });

  constructor(
    @Inject(AUTH_REDIRECT) private redirect: string,
    @Inject(AUTH_SERVICE) private authService: AuthService
  ) {}

  submit() {
    if (this.loginForm.invalid) {
      this.clrForm.markAsTouched();
    } else {
      const payload = this.loginForm.getRawValue() as User;
      this.authService.login(payload, this.redirect);
    }
  }
}
