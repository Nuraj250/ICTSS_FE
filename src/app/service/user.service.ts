import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUser(): Observable<any> {
    return this.http.get(environment.baseUrl + '/getAll');
  }

  public saveUser(user: User): Observable<any> {
    return this.http.post(environment.baseUrl + '/save', user);
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(environment.baseUrl + `/update/${user.id}`, user);
  }

  public deleteUser(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + `/deleteEmployee/${id}`);
  }
}