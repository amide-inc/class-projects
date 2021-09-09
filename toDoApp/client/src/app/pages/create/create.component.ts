import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.createForm = this.fb.group({
      'name': [''],
      'about': [''],
      'date': ['']
    })
  }

  ngOnInit(): void {
  }

  save() {
    const data = this.createForm.value;
    data['date'] = new Date(data['date']).valueOf()
    this.todoService.saveTodo(data)
      .subscribe(
        res => {
          if(res.success) {
            alert("saved")
          }else {
            alert("not saved");
          }
          
        },
        err =>{
          alert("server error")
        }
      )
  }
  reset() {
    this.createForm.reset();
  }

}
