import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/model/team.model';
import { TeamService } from 'src/app/service/Team.service';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';

import { setHttResponse, setHttpListResponse, getAbstractController, checkAndTouchFormValidation, scrollTop } from 'src/app/utils/function';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  teamInfoViewPath = "/" + APPLICATION_ROUTES.viewTeams.path.replace(":id", '');
  selectedTeam = new Team();
  deleteTeam = new Team();
  teams: Team[] = [];
  deleteselectedTeam: any
  teamForm: any = new FormGroup({});
  TeamInfoUpdate: any = [];

  noOfRecordsPerPage: any = 10;
  dataSliceStart: any = 0;
  dataSliceEnd: any = this.noOfRecordsPerPage;
  viewPageNo: any = 0;

  constructor(private TeamService: TeamService,
    private activatedRoute: ActivatedRoute, private routerNavigate: Router) { }


  ngOnInit() {
    this.teamForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      bowlers: new FormControl('', [Validators.required]),
      batsmans: new FormControl('', [Validators.required]),
      allrounders: new FormControl('', [Validators.required])
    })
  }

  resetForm() {
    this.teamForm.reset();
    this.teams = this.activatedRoute.snapshot.data?.['Team'];
    this.selectedTeam = new Team();
    this.deleteTeam = new Team();
  }

  /**
   * used to add function to cancel button
   */
  btnCancel() {
    this.resetForm();
  }

  getCurrentDate() {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear + 1, 11, 31)
  }
  /**
   * used to add function to save button
   */
  public btnTeamSubmit() {
    if (this.teamForm.valid) {
      if (this.selectedTeam.id !== null) {
        const updatedTeam = this.teamForm.value as Team;
        setHttResponse<Team>(this.TeamService.updateTeam(updatedTeam))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      } else {
        let addTeam: Team;
        addTeam = this.teamForm.value;
        setHttResponse<Team>(this.TeamService.saveTeam(addTeam))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      }
    }
  }
  /**
   * used to get all Teams
   */
  private findAllExpense() {
    setHttpListResponse<Team>(this.TeamService.getTeam())
      .then((res:any) => {
        this.teams = res;
      })
  }

  /**
   * used to add function to delete button
   */
  public deletedTeam() {
    if (this.deleteselectedTeam.name) {
      setHttResponse(this.TeamService.deleteTeam(this.deleteselectedTeam))
        .then(resolve => {
          if (resolve.message) {
            this.resetForm();
            this.findAllExpense();
          }
        })
    }
  }

  /**
   * used to get row data to from controller
   */
  public tbTeamSelectUpdatingData(selectedRow: any) {
    this.selectedTeam = selectedRow;
    this.teamForm.patchValue(this.selectedTeam);
  }

  /**
 * used to set data from Team Info component
 */
  SelectUpdatingData() {
    this.selectedTeam = this.TeamInfoUpdate;
    this.teamForm.patchValue(this.TeamInfoUpdate);
  }

  /*used to show selected Team's data in the table from search
  * @param event
  */
  routeToTeamInfo(value: any) {
    let routePath = APPLICATION_ROUTES.viewTeams.path.replace(":id", this.selectedTeam.id + '');
    this.routerNavigate.navigate([routePath], { state: { TeamDetails: value } });
  }
  /**
  * used to get abstract controller from function.ts class
  * @param fg
  * @param fc
  */
  public getAbstractController(fg: FormGroup, fc: string) {
    return getAbstractController(fg, fc);
  }

  /**
  * Used to check validation
  * @returns boolean
  */
  public checkAndTouchFormValidation(): boolean {
    return checkAndTouchFormValidation(this.teamForm);
  }

  /**
   * Used to scroll to the top of the window
  * @description 
  */
  public scrollTop() {
    scrollTop();
  }

  /**
   *used to slice the Team array
  */
  public sliceArray(argument: { dataSliceStart: 0, dataSliceEnd: 2 }) {
    this.dataSliceStart = argument.dataSliceStart;
    this.dataSliceEnd = argument.dataSliceEnd;
  }
}
