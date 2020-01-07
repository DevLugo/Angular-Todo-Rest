import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  uri: string = environment.apiUrl;
  token: string;

  constructor(private http: HttpClient, private router: Router) {}
  login(emai: string, password: string) {
    this.http
      .post(this.uri + "/authenticate", { email: emai, password })
      .subscribe((resp: any) => {
        this.router.navigate(["profile"]);
        localStorage.setItem("auth_token", resp.token);
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  public get isLogued(): boolean {
    return localStorage.getItem("token") !== null;
  }
}
