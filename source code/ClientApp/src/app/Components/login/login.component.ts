import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  hideBtnLogin = false;
  result;
  constructor(private _loginService: LoginService, public fb: FormBuilder, private router: Router, ) {
    if (this._loginService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  //Submit clicked.
  //When reaching server , we should get User object with token or null for not validated password;
  async Login() {
    this.hideBtnLogin = true;
    this.result = await this._loginService.Authenticate(this.loginForm);
    this.AfterLogin();
  }

  /* If login succesful, redirct else alert */
  AfterLogin() {
    if (this.result) {
      this.router.navigate(['/home']);
    }
    else {
      alert('wrong password');
      this.hideBtnLogin = false;
    };
  }
}
