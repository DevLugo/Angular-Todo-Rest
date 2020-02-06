import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_helpers/_models/user";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  uri: string = `${environment.apiUrl}/auth/`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string) {
    return this.http
      .post<any>(`${this.uri}/signup`, { username, password, email: username })
      .pipe(
        map(user => {
          return true;
        })
      );
  }

  login(username: string, password: string) {
    console.log("elefante");
    return this.http
      .post<any>(`${this.uri}/signin`, { username, password })
      .pipe(
        map(user => {
          console.log("sss");
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
