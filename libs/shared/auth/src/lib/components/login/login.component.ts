import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { REGEXPS } from '@ghv/utils';
import { LoginPayload } from '../../models';
import { AUTH_SERVICE, AuthService } from '../../services';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @ViewChild(ClrForm) private clrForm!: ClrForm;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loginForm = new FormGroup<ControlsOf<LoginPayload>>({
    type: new FormControl<string>('token', [Validators.required]),
    token: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(REGEXPS.accessToken),
    ]),
  });
  error$ = this.authService.select('error');

  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) {}

  submit() {
    if (this.loginForm.invalid) {
      this.clrForm.markAsTouched();
    } else {
      const payload = this.loginForm.getRawValue() as LoginPayload;
      this.loginForm.reset({ type: 'token' });
      this.authService.login(payload);
    }
  }
}
