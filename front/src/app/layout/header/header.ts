import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm?: NgForm;

  showLoginModal = false;
  username = '';
  password = '';
  isLoading = false;
  loginError = '';
  loginSuccess = '';
  isAuthenticated = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => {
        console.log('isAuthenticated updated:', isAuth);
        this.isAuthenticated = isAuth;

        // Si authentification réussie, vider le formulaire
        if (isAuth) {
          this.resetForm();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  openLoginModal(): void {
    this.showLoginModal = true;
    this.loginError = '';
    this.loginSuccess = '';
    this.username = '';
    this.password = '';
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
    this.resetForm();
  }

  private resetForm(): void {
    this.loginError = '';
    this.loginSuccess = '';
    this.username = '';
    this.password = '';
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  login(): void {
    if (!this.loginForm || !this.loginForm.valid) {
      this.loginError = 'Please fill in all fields';
      return;
    }

    if (!this.username.trim()) {
      this.loginError = 'Username is required';
      return;
    }
    if (!this.password.trim()) {
      this.loginError = 'Password is required';
      return;
    }

    this.isLoading = true;
    this.loginError = '';
    this.loginSuccess = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.isLoading = false;
        this.loginSuccess = 'Login successful!';

        // Fermer la modal après un court délai pour montrer le message
        setTimeout(() => {
          this.closeLoginModal();
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        this.loginError = error.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  logout(): void {
    console.log('Logout clicked');
    this.isLoading = true;

    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        // Important: réinitialiser isLoading AVANT de changer l'état d'authentification
        this.isLoading = false;
        // Maintenant on peut changer l'état d'authentification
        this.authService.setAuthenticationState(false);
      },
      error: (error) => {
        this.isLoading = false;
        this.authService.setAuthenticationState(false);
        console.error('Logout error:', error);
      }
    });
  }
}
