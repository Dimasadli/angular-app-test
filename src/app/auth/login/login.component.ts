import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LabelComponent } from '../../components/label/label.component';
import { ErrorTextComponent } from '../../components/error-text/error-text.component';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../../environments/environment.development';

// const DUMMY = {
//   username: 'admin',
//   password: '123',
// };

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LabelComponent,
    ErrorTextComponent,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm!: FormGroup;
  DUMMY: any = environment.dummyCredentials;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin(): void {
    // Trigger if username or password is empty
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    // Trigger if username or password didn't matched
    if (username !== this.DUMMY.username && password !== this.DUMMY.password) {
      this.errorMessage = 'Username atau password salah';
    } else {
      localStorage.setItem('token', 'admin-token');
      this.router.navigate(['/employee-list']);
    }
  }
}
