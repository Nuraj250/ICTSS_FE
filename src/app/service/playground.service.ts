import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { PlayGround } from '../model/playground.model';

@Injectable({
  providedIn: 'root'
})
export class PlayGroundService {

  constructor(private http: HttpClient) {
  }

  public getPlayGround(): Observable<any> {
    return this.http.get(environment.apiUrl + '/getAll');
  }

  public savePlayGround(playGround: PlayGround): Observable<any> {
    return this.http.post(environment.apiUrl + '/save', playGround);
  }

  public updatePlayGround(playGround: PlayGround): Observable<any> {
    return this.http.put(environment.apiUrl + `/update/${playGround.id}`, playGround);
  }

  public deletePlayGround(id: any): Observable<any> {
    return this.http.delete(environment.apiUrl + `/deleteEmployee/${id}`);
  }
}