import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {
  }

  public getPlayer(): Observable<any> {
    return this.http.get(environment.baseUrl + '/getAll');
  }

  public savePlayer(player: Player): Observable<any> {
    return this.http.post(environment.baseUrl + '/save', player);
  }

  public updatePlayer(player: Player): Observable<any> {
    return this.http.put(environment.baseUrl + `/update/${player.id}`, player);
  }

  public deletePlayer(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + `/deleteEmployee/${id}`);
  }
}