import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../_services/todo.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.sass"]
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    console.log("ssss");
    this.todoService.getAll().subscribe(todos => {
      console.log("inside");
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    console.log(this.todos);
    console.log(todo);
    // Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);

    // Remove fron server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      console.log(todo);
      this.todos.push(todo);
    });
  }
}
