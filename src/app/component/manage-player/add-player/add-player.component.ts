import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player.model';
import { PlayerService } from 'src/app/service/player.service';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';
import { checkAndTouchFormValidation, getAbstractController, setHttResponse, setHttpListResponse } from 'src/app/utils/function';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  PlayerInfoViewPath = "/" + APPLICATION_ROUTES.viewplayer.path.replace(":id", '');
  selectedPlayer = new Player();
  deletePlayer= new Player();
  players: Player[] = [];
  deleteSelectedPlayer: any
  playerForm: any = new FormGroup({});
  playerInfoUpdate: any = [];

  noOfRecordsPerPage: any = 10;
  dataSliceStart: any = 0;
  dataSliceEnd: any = this.noOfRecordsPerPage;
  viewPageNo: any = 0;

  constructor(private playerService: PlayerService,
    private activatedRoute: ActivatedRoute, private routerNavigate: Router) { }


  ngOnInit() {
    this.playerForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
    })
  }

  resetForm() {
    this.playerForm.reset();
    this.players = this.activatedRoute.snapshot.data?.['player'];
    this.selectedPlayer = new Player();
    this.deletePlayer = new Player();
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
  public btnPlayerSubmit() {
    if (this.playerForm.valid) {
      if (this.selectedPlayer.id !== null) {
        const updatedPlayer = this.playerForm.value as Player;
        setHttResponse<Player>(this.playerService.updatePlayer(updatedPlayer))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      } else {
        let addPlayer: Player;
        addPlayer = this.playerForm.value;
        setHttResponse<Player>(this.playerService.savePlayer(addPlayer))
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
   * used to get all Players
   */
  private findAllExpense() {
    setHttpListResponse<Player>(this.playerService.getPlayer())
      .then((res:any) => {
        this.players = res;
      })
  }

  /**
   * used to add function to delete button
   */
  public deletedPlayer() {
    if (this.deleteSelectedPlayer.name) {
      setHttResponse(this.playerService.deletePlayer(this.deleteSelectedPlayer))
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
  public tbPlayerSelectUpdatingData(selectedRow: any) {
    this.selectedPlayer = selectedRow;
    this.playerForm.patchValue(this.selectedPlayer);
  }

  /**
 * used to set data from Player Info component
 */
  SelectUpdatingData() {
    this.selectedPlayer = this.playerInfoUpdate;
    this.playerForm.patchValue(this.playerInfoUpdate);
  }

  /*used to show selected Player's data in the table from search
  * @param event
  */
  routeToPlayerInfo(value: any) {
    let routePath = APPLICATION_ROUTES.viewplayer.path.replace(":id", this.selectedPlayer.id + '');
    this.routerNavigate.navigate([routePath], { state: { PlayerDetails: value } });
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
    return checkAndTouchFormValidation(this.playerForm);
  }

  /**
   * Used to scroll to the top of the window
  * @description 
  */
  public scrollTop() {
    this.scrollTop();
  }

  /**
   *used to slice the Player array
  */
  public sliceArray(argument: { dataSliceStart: 0, dataSliceEnd: 2 }) {
    this.dataSliceStart = argument.dataSliceStart;
    this.dataSliceEnd = argument.dataSliceEnd;
  }
}
