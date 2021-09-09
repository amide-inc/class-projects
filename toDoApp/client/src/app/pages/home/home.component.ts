import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toDos: any;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  delete(i: number) {
  const id = this.toDos[i]._id;
  this.todoService.deleteTodoByID(id).subscribe(
    res => {
      if(res.success) {
        this.getTodos();
      }
    },
    err => {
      alert("server error")
    }
  )
  }
  getTodos() {
    this.todoService.getTodos().subscribe(
      res => {
        if (res.success) {
          this.toDos = res.data;
        }
      },
      err => {
        alert("server error")
      }
    )
  }
}
