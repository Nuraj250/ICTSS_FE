import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/User.model';  // Make sure the path is correct

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUserSubject: BehaviorSubject<User | null>;  // Allow null in the subject
  public currentUser: Observable<User | null>;  // Observable to watch user state changes

  constructor() {
    const userData = localStorage.getItem('user');  // Get user from localStorage
    const parsedUser = userData ? JSON.parse(userData) : null;  // Parse only if not null

    this._currentUserSubject = new BehaviorSubject<User | null>(parsedUser);  // Initialize subject
    this.currentUser = this._currentUserSubject.asObservable();  // Expose as observable
  }

  public get currentUserValue(): User | null {
    return this._currentUserSubject.value;  // Return current user value
  }

  public get currentUserSubject(): BehaviorSubject<User | null> {
    return this._currentUserSubject;  // Return the subject directly
  }

  public loadUserData(): Promise<void> {
    return new Promise<void>((resolve) => {
      const userData = localStorage.getItem('user');
      const parsedUser = userData ? JSON.parse(userData) : null;

      this._currentUserSubject.next(parsedUser);  // Update subject with parsed user
      resolve();
    });
  }
}
