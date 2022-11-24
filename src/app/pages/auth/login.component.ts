import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  passwordVisibile = false;
  form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  // Test functions
  ngOnInit(): void {
    this.authService.removeUser();
  }

  ngOnDestroy(): void {
    this.authService.setUser();
  }
  // ==============

  get f() {
    return this.form.controls;
  }

  togglePasswordVisiblity() {
    this.passwordVisibile = !this.passwordVisibile;
  }

  onLogin() {
    this.router.navigate(['/', 'dashboard']);
  }
}
