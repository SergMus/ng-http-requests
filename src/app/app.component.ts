import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Todo } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'http-requests';
  todos: Todo[] = [];
  titleTodo = '';
  loading = false;
  error = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchTodo();
  }

  addTodo() {
    if (!this.titleTodo.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.titleTodo,
      completed: false,
    };

    this.httpService.addOne(newTodo).subscribe((resp) => {
      this.todos.push(resp);
      this.titleTodo = '';
    });
  }

  fetchTodo() {
    this.loading = true;
    this.httpService.fetchAll().subscribe(
      (resp) => {
        this.todos = resp;
        this.loading = false;
      },
      (error) => (this.error = error.message)
    );
  }

  deleteTodo(id: number) {
    this.httpService.remove(id).subscribe(() => {
      this.todos = this.todos.filter((item) => item.id !== id);
      console.log(this.todos, id);
    });
  }

  completeTodo(id: number) {
    this.httpService.complete(id).subscribe((resp) => {
      this.todos.find((item) => item.id === resp.id)!.completed = true;
    });
  }
}
