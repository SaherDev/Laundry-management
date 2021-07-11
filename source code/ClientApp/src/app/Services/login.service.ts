import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //For current user in localstorage
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user: User;

  url = "http://localhost:4201/api/";
  constructor(private http: HttpClient, private router: Router) {
    try {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
    catch {
      localStorage.removeItem('currentUser');
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  async Authenticate(loginForm: FormGroup) {
    var formData: any = new FormData();
    formData.append("username", loginForm.get('username').value);
    formData.append("password", loginForm.get('password').value);

    var user = {
      username: loginForm.get('username').value,
      password: loginForm.get('password').value
    };
    let response = await this.http.post(this.url + "users", user).toPromise();

    //deal with response
    try {
      let res: User[];
      res = response as User[];
      if (res.length < 0) return false;

      let user: User;
      user = res[0];
      //Set User fields
      localStorage.setItem('username', user.username);
      localStorage.setItem('token', user.token);
      var keep = {
        username: user.username,
        token: user.token,
        password: user.password
      }
      localStorage.setItem('currentUser', JSON.stringify(keep));
      this.currentUserSubject.next(keep);
      return true;
    }
    catch{
      return false;
    }

  }
}
