import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from "@angular/common/http";
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
  uri: string = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string): Observable<any> {
    const httpOptions: { headers; observe } = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: "response"
    };
    return this.http.post(
      `${this.uri}/signup`,
      {
        username,
        password,
        email: username
      },
      httpOptions
    );
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.uri}/signin`, { username, password });
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
