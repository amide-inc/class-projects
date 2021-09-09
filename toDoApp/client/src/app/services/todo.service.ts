import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos() :Observable<any> {
    return this.http.get("http://localhost:8080/todo");
  }
  getTodosById(id:string):Observable<any> {
    return this.http.get("http://localhost:8080/todo/"+id);
  }
  saveTodo(data:any) :Observable<any> {
    return this.http.post("http://localhost:8080/todo/", data);
  }
  updateTodoById(id:string, data:any):Observable<any>  {
    return this.http.patch("http://localhost:8080/todo/"+id, data);
  }
  deleteTodoByID(id:string):Observable<any>  {
    return this.http.delete("http://localhost:8080/todo/"+id);
  }
}
