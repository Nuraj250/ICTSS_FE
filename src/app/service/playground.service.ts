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
    return this.http.get(environment.baseUrl + '/getAll');
  }

  public savePlayGround(playGround: PlayGround): Observable<any> {
    return this.http.post(environment.baseUrl + '/save', playGround);
  }

  public updatePlayGround(playGround: PlayGround): Observable<any> {
    return this.http.put(environment.baseUrl + `/update/${playGround.id}`, playGround);
  }

  public deletePlayGround(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + `/deleteEmployee/${id}`);
  }
}