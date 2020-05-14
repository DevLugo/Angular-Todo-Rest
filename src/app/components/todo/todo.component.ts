import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../_services/todo.service";
import { Observable, Subscription } from "rxjs";
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.sass"]
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  todoSuscription: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.todoSuscription = this.todoService.todos$.subscribe(res => {
      this.todos = res;
    });
    this.todoService.getAll();
  }

  deleteTodo(todo: Todo) {
    // Remove from UI

    // Remove fron server
    this.todoService.deleteTodo(todo).subscribe(todo => {
      this.todoService.getAll();
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todoService.getAll();
    });
  }
}
