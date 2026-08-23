import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { ConfigService } from '../core/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isAuthenticated = signal(false);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(readonly http: HttpClient, readonly config: ConfigService) {}

  login(username: string, password: string): Observable<any> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post(`${this.config.apiUrl}/login`, { username, password }).pipe(
      tap(() => {
        console.log('Connecté');
        this.isAuthenticated.set(true);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la connexion:', error);
        this.isAuthenticated.set(false);
        this.error.set(error.error?.message || 'Erreur lors de la connexion');
        return throwError(() => error);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  logout(): Observable<any> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post(`${this.config.apiUrl}/logout`, {}).pipe(
      tap(() => {
        console.log('Déconnecté');
        this.isAuthenticated.set(false);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.isAuthenticated.set(false);
        this.error.set(error.error?.message || 'Erreur lors de la déconnexion');
        return throwError(() => error);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  checkAuthStatus(): void {
    this.http.get<any>(`${this.config.apiUrl}/status`).pipe(
      tap((response: any) => {
        const authenticated = response?.authenticated === true;
        console.log('Statut de connexion:', authenticated);
        this.isAuthenticated.set(authenticated);
      }),
      catchError((error) => {
        console.warn('Statut d\'authentification non disponible, en supposant non authentifié', error);
        this.isAuthenticated.set(false);
        return of(null);
      })
    ).subscribe();
  }
}
