import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { UserService } from 'src/app/service/user.service';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';

import { setHttResponse, setHttpListResponse, getAbstractController, checkAndTouchFormValidation, scrollTop } from 'src/app/utils/function';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userInfoViewPath = "/" + APPLICATION_ROUTES.viewUser.path.replace(":id", '');
  selectedUser = new User();
  deleteUser = new User();
  users: User[] = [];
  deleteselectedUser: any
  userForm: any = new FormGroup({});
  userInfoUpdate: any = [];

  noOfRecordsPerPage: any = 10;
  dataSliceStart: any = 0;
  dataSliceEnd: any = this.noOfRecordsPerPage;
  viewPageNo: any = 0;

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute, private routerNavigate: Router) { }


  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }

  resetForm() {
    this.userForm.reset();
    this.users = this.activatedRoute.snapshot.data?.['user'];
    this.selectedUser = new User();
    this.deleteUser = new User();
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
  public btnuserSubmit() {
    if (this.userForm.valid) {
      if (this.selectedUser.id !== null) {
        const updateduser = this.userForm.value as User;
        setHttResponse<User>(this.userService.updateUser(updateduser))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      } else {
        let adduser: User;
        adduser = this.userForm.value;
        setHttResponse<User>(this.userService.saveUser(adduser))
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
   * used to get all users
   */
  private findAllExpense() {
    setHttpListResponse<User>(this.userService.getUser())
      .then((res:any) => {
        this.users = res;
      })
  }

  /**
   * used to add function to delete button
   */
  public deletedUser() {
    if (this.deleteselectedUser.name) {
      setHttResponse(this.userService.deleteUser(this.deleteselectedUser))
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
  public tbuserSelectUpdatingData(selectedRow: any) {
    this.selectedUser = selectedRow;
    this.userForm.patchValue(this.selectedUser);
  }

  /**
 * used to set data from user Info component
 */
  SelectUpdatingData() {
    this.selectedUser = this.userInfoUpdate;
    this.userForm.patchValue(this.userInfoUpdate);
  }

  /*used to show selected user's data in the table from search
  * @param event
  */
  routeTouserInfo(value: any) {
    let routePath = APPLICATION_ROUTES.viewUser.path.replace(":id", this.selectedUser.id + '');
    this.routerNavigate.navigate([routePath], { state: { userDetails: value } });
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
    return checkAndTouchFormValidation(this.userForm);
  }

  /**
   * Used to scroll to the top of the window
  * @description 
  */
  public scrollTop() {
    scrollTop();
  }

  /**
   *used to slice the user array
  */
  public sliceArray(argument: { dataSliceStart: 0, dataSliceEnd: 2 }) {
    this.dataSliceStart = argument.dataSliceStart;
    this.dataSliceEnd = argument.dataSliceEnd;
  }
}
