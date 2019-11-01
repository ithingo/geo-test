import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from  'rxjs/operators';

import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
  private authSubject = new BehaviorSubject(false);

  private async setTokens(res: AuthResponse): Promise<void> {
    await this.storage.set('ACCESS_TOKEN', res.user.access_token);
    await this.storage.set('EXPIRES_IN', res.user.expires_in);
    this.authSubject.next(true);
  }

  private async clearTokens(): Promise<void> {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.authSubject.next(false);
  }

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  public register(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/auth/register`, user)
      .pipe(
        tap(async (res: AuthResponse) => {
          if (res.user) {
            await this.setTokens(res);
          }
        })
      );
  }

  public async logout(): Promise<void> {
    await this.clearTokens();
  }

  private get loginState$(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
