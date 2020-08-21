import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { emailValidator } from '@workspace/shared/shared';
import { AuthServiceIntf } from '../../models';
import { AUTH_SERVICE, AUTH_REDIRECT } from '../../tokens/auth.tokens';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(ClrForm) private clrForm: ClrForm;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loginForm = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(AUTH_REDIRECT) private redirect: string,
    @Inject(AUTH_SERVICE) private authService: AuthServiceIntf
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  submit() {
    if (this.loginForm.invalid) {
      this.clrForm.markAsTouched();
    } else {
      const payload = this.loginForm.getRawValue();
      this.authService.login(payload);
      // redirect after login
      this.router.navigateByUrl(this.redirect);
    }
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }
}
