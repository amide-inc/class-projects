import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(data) :Observable<any>{
    return this.http.post('http://localhost:8080/auth/signup', data);
  }
  sigin(data): Observable<any> {
    
    return this.http.post(
      'http://localhost:8080/auth/login',
     data);
  }

  getProfile(): Observable<any> {
    let headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.get('http://localhost:8080/auth/profile', {headers: headers})
  }
}
