import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ConfigService } from '../core/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/login`, { username, password }).pipe(
      tap(() => {
        console.log('Login successful');
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        this.isAuthenticatedSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/logout`, {}).pipe(
      tap(() => {
        console.log('Logout successful');
        this.isAuthenticatedSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Logout failed:', error);
        this.isAuthenticatedSubject.next(false);
        return throwError(() => error);
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
    this.http.get<any>(`${this.config.apiUrl}/status`).pipe(
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
