import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http:HttpClient) { }

  getProducts() :Observable<any> {
    return this.http.get('http://localhost:8080/product');
  }
  getProductsById(id):Observable<any> {
    return this.http.get('http://localhost:8080/product/'+id);
  }
  createOrder(data):Observable<any> {
    let headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.post('http://localhost:8080/order/create', data, {headers: headers});
  }

}
