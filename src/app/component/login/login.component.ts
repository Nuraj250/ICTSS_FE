import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageService } from '../../service/message.service';
import { setHttResponse } from 'src/app/utils/function';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});  // Ensure it's a typed FormGroup
  invalidLogin = false;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private messageService: MessageService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    if (localStorage.getItem('user')) {
      this.authenticationService.logout();
    }
  }

  // Mark the function as async to use await properly
  public async btnLogIN() {
    console.log(this.loginForm.value);
    this.authenticationService.basicLogin(this.loginForm.value).pipe(first()).subscribe({
      next: data => {
        this.authenticationService.setUser(data);
        this.router.navigateByUrl('', {replaceUrl: true, state: {isLogin: true}});
        this.invalidLogin = false;
      },
      error: error => {
        this.invalidLogin = true;
        console.log(error);
        this.messageService.error('LOGIN_FAILED', error);
      }

    });
    
  }

    /**
   * When press ENTER key trigger login
   *
   * @param event Get pressed key from password field
   */
    onKeydown(event: { key: string; }) {
      if (event.key === 'Enter') {
        if (this.loginForm.valid) {
          this.btnLogIN();
        } else {
          this.messageService.error('LOGIN_FAILED', 'LOGIN_INCOMPLETE');
        }
      }
    }
}
