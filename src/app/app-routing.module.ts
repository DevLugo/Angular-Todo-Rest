import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { TodoComponent } from "./components/todo/todo.component";
import { AuthGuard } from "./_helpers/auth.guard";

const routes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: TodoComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
