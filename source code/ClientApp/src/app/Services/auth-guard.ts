import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { LoginService } from "./login.service";
import { User } from "../Interfaces/User";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  url = "http://localhost:4201/api/";
  constructor(
    private router: Router,
    private _loginService: LoginService,
    private http: HttpClient
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const currentUser = this._loginService.currentUserValue;
      if (currentUser) {

        //Ask server if my token == server token
        let response = await this.http.post(this.url + "users/token", currentUser).toPromise();

        //Get invalid or valid token.
        var re = JSON.stringify(response);
        var res = JSON.parse(re);
        if (res.token == "valid") return true;
        else {
          // not logged in so redirect to login page
          this.router.navigate(["/login"]);
          return false;
        }
      }
    } catch {
      // not logged in so redirect to login page
      this.router.navigate(["/login"]);
      return false;
    }
    // not logged in so redirect to login page
    this.router.navigate(["/login"]);
    return false;
  }
}
