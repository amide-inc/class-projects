import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  toDo: any;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {
    this.editForm = this.fb.group({
      'name': [''],
      'about': [''],
    })
  }
  ngOnInit(): void {
    this.getTodoById();
  }

  getTodoById() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getTodosById(id)
        .subscribe(
          res => {
            console.log(res);
            if (res.success) {
              this.toDo = res.data;
              this.editForm.get('name')?.setValue(this.toDo.name);
              this.editForm.get('about')?.setValue(this.toDo.about);
              this.editForm.get('date')?.setValue(this.toDo.date)
            }
          },
          err => {
            alert("server error")
          }

        )
    }

  }
  update() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.updateTodoById(id, this.editForm.value)
        .subscribe(
          res => {
            if(res.success) {
              alert("updated")
            }else {
              alert("updation issue")
            }
          },
          err => {
            alert("server error")
          }
        )
    }

  }

}
