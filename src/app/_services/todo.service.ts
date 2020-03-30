import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosUrl: string = `${environment.apiUrl}todo`;
  todosLimit: string = "?_limit=6";

  todos$ = new EventEmitter<any[]>();
  //private readonly todos: Observable<Todo[]>;

  constructor(private http: HttpClient) {}

  // Get Todos
  getAll() {
    this.http
      .get<Todo[]>(`${this.todosUrl}${this.todosLimit}`)
      .subscribe(res => {
        this.todos$.emit(res);
      });
  }

  // Toggle Completed
  toggleComplelted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    console.log(todo);
    console.log("E");
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
