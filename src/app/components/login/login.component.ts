import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  constructor(private authService: AuthService) {}

  Login() {
    console.log("You are loggin in");
    this.authService.login(this.email, this.password);
  }

  ngOnInit() {}
}
