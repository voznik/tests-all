import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { emailValidator } from '@workspace/shared/shared';
import { AuthServiceIntf } from '../../models';
import { AUTH_SERVICE } from '../../tokens/auth.tokens';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(ClrForm) private clrForm: ClrForm;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loginForm = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
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
    }
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }
}
