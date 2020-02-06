import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule, routinngComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoComponent } from "./components/todo/todo.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { AddTodoComponent } from "./components/add-todo/add-todo.component";
import { from } from "rxjs";
import { FooterComponent } from "./components/layout/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoItemComponent,
    HeaderComponent,
    AddTodoComponent,
    FooterComponent,
    routinngComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
