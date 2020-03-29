import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.sass"]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  error: string = "";
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/signin";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService
      .register(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          console.log(data);
          this.success = true;
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.error = err;
          this.loading = false;
        }
      );
  }
}
