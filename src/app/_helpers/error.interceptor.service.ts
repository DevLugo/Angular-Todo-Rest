import { Injectable } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenStorageService } from "../_services/token-storage.service";

@Injectable()
export class ErrorInterceptorService {
  constructor(private tokenService: TokenStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status == 401) {
          // auto logout if 401 response returned from api
          console.log("ErrorInterceptorService");
          this.tokenService.removeToken();
          location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
