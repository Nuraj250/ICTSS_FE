import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Team } from '../model/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  public getTeam(): Observable<any> {
    return this.http.get(environment.apiUrl + '/getAll');
  }

  public saveTeam(team: Team): Observable<any> {
    return this.http.post(environment.apiUrl + '/save', team);
  }

  public updateTeam(team: Team): Observable<any> {
    return this.http.put(environment.apiUrl + `/update/${team.id}`, team);
  }

  public deleteTeam(id: any): Observable<any> {
    return this.http.delete(environment.apiUrl + `/deleteEmployee/${id}`);
  }
}