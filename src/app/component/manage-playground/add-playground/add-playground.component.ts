import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayGround } from 'src/app/model/playground.model';
import { PlayGroundService } from 'src/app/service/playground.service';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';
import { checkAndTouchFormValidation, getAbstractController, setHttResponse, setHttpListResponse } from 'src/app/utils/function';

@Component({
  selector: 'app-add-playground',
  templateUrl: './add-playground.component.html',
  styleUrls: ['./add-playground.component.scss']
})
export class AddPlaygroundComponent implements OnInit {

  playGroundInfoViewPath = "/" + APPLICATION_ROUTES.viewPlayGround.path.replace(":id", '');
  selectedPlayGround = new PlayGround();
  deletedPlayGround= new PlayGround();
  playGrounds: PlayGround[] = [];
  deleteSelectedPlayGround: any
  playGroundForm: any = new FormGroup({});
  playGroundInfoUpdate: any = [];

  noOfRecordsPerPage: any = 10;
  dataSliceStart: any = 0;
  dataSliceEnd: any = this.noOfRecordsPerPage;
  viewPageNo: any = 0;

  constructor(private playeGroundService: PlayGroundService,
    private activatedRoute: ActivatedRoute, private routerNavigate: Router) { }


  ngOnInit() {
    this.playGroundForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      longtitue: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),

    })
  }

  resetForm() {
    this.playGroundForm.reset();
    this.playGrounds = this.activatedRoute.snapshot.data?.['playeGround'];
    this.selectedPlayGround = new PlayGround();
    this.deletedPlayGround = new PlayGround();
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
  public btnPlayGroundSubmit() {
    if (this.playGroundForm.valid) {
      if (this.selectedPlayGround.id !== null) {
        const updatedplayeGround = this.playGroundForm.value as PlayGround;
        setHttResponse<PlayGround>(this.playeGroundService.updatePlayGround(updatedplayeGround))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      } else {
        let addplayeGround: PlayGround;
        addplayeGround = this.playGroundForm.value;
        setHttResponse<PlayGround>(this.playeGroundService.savePlayGround(addplayeGround))
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
   * used to get all playeGrounds
   */
  private findAllExpense() {
    setHttpListResponse<PlayGround>(this.playeGroundService.getPlayGround())
      .then((res:any) => {
        this.playGrounds = res;
      })
  }

  /**
   * used to add function to delete button
   */
  public deletePlayGround() {
    if (this.deleteSelectedPlayGround.name) {
      setHttResponse(this.playeGroundService.deletePlayGround(this.deleteSelectedPlayGround))
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
  public tbPlayGroundSelectUpdatingData(selectedRow: any) {
    this.selectedPlayGround = selectedRow;
    this.playGroundForm.patchValue(this.selectedPlayGround);
  }

  /**
 * used to set data from playeGround Info component
 */
  SelectUpdatingData() {
    this.selectedPlayGround = this.playGroundInfoUpdate;
    this.playGroundForm.patchValue(this.playGroundInfoUpdate);
  }

  /*used to show selected playeGround's data in the table from search
  * @param event
  */
  routeToplayeGroundInfo(value: any) {
    let routePath = APPLICATION_ROUTES.viewPlayGround.path.replace(":id", this.selectedPlayGround.id + '');
    this.routerNavigate.navigate([routePath], { state: { playeGroundDetails: value } });
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
    return checkAndTouchFormValidation(this.playGroundForm);
  }

  /**
   * Used to scroll to the top of the window
  * @description 
  */
  public scrollTop() {
    this.scrollTop();
  }

  /**
   *used to slice the playeGround array
  */
  public sliceArray(argument: { dataSliceStart: 0, dataSliceEnd: 2 }) {
    this.dataSliceStart = argument.dataSliceStart;
    this.dataSliceEnd = argument.dataSliceEnd;
  }
}
