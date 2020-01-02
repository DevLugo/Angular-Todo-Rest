import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.sass']
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  title:string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("add-todo.component")
    const todo = {
      title: this.title,
      component: false
    }

    this.addTodo.emit(todo);
  }

}
