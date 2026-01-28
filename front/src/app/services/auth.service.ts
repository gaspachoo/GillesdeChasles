import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Ne pas vérifier le statut au démarrage pour éviter les erreurs 502
    // Le statut sera vérifié après le premier login
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(() => {
        // Token is automatically stored in httpOnly cookie by the backend
        console.log('Login successful');
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        this.isAuthenticatedSubject.next(false);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        console.log('Logout successful');
        // Ne pas changer l'état ici, laisser le composant le faire
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Logout failed:', error);
        throw error;
      })
    );
  }

  isAuthenticated(): boolean {
    let isAuth = false;
    this.isAuthenticated$.subscribe(value => {
      isAuth = value;
    }).unsubscribe();
    return isAuth;
  }

  setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  checkAuthStatus(): void {
    // Vérifier l'état d'authentification avec le backend
    this.http.get<any>(`${this.apiUrl}/status`).pipe(
      tap((response: any) => {
        const authenticated = response?.authenticated === true;
        console.log('Auth status check:', authenticated);
        this.isAuthenticatedSubject.next(authenticated);
      }),
      catchError((error) => {
        console.warn('Auth status check failed, assuming not authenticated', error);
        this.isAuthenticatedSubject.next(false);
        return of(null);
      })
    ).subscribe();
  }
}
