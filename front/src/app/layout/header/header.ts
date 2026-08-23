import { Component, OnInit, ViewChild, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.css',
})
export class Header implements OnInit {
  @ViewChild('loginForm') loginForm?: NgForm;

  readonly showLoginModal = signal(false);
  readonly username = signal('');
  readonly password = signal('');
  readonly loginError = signal('');
  readonly loginSuccess = signal('');

  isAuthenticated = signal(false);
  isLoading = signal(false);

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.isLoading = this.authService.isLoading;
    this.authService.checkAuthStatus();
  }

  openLoginModal(): void {
    this.showLoginModal.set(true);
    this.loginError.set('');
    this.loginSuccess.set('');
    this.username.set('');
    this.password.set('');
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  closeLoginModal(): void {
    this.showLoginModal.set(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.loginError.set('');
    this.loginSuccess.set('');
    this.username.set('');
    this.password.set('');
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  login(): void {
    if (!this.loginForm?.valid) {
      this.loginError.set('Please fill in all fields');
      return;
    }

    const user = this.username();
    const pass = this.password();

    if (!user.trim()) {
      this.loginError.set('Username is required');
      return;
    }
    if (!pass.trim()) {
      this.loginError.set('Password is required');
      return;
    }

    this.loginError.set('');
    this.loginSuccess.set('');

    this.authService.login(user, pass).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.loginSuccess.set('Login successful!');
        this.resetForm();

        setTimeout(() => {
          this.closeLoginModal();
        }, 1000);
      },
      error: (error) => {
        this.loginError.set(error.error?.message || 'Login failed. Please try again.');
        console.error('Login error:', error);
      }
    });
  }

  logout(): void {
    console.log('Logout clicked');

    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (error) => {
        console.error('Logout error:', error);
      }
    });
  }
}
