import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop/shop.service';
declare var Razorpay:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private shopService:ShopService) { }
  products = [];
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts()
        .subscribe(
          res => {
           if(res.success) {
            this.products = res.data;
           }
          },
          err => {
            alert("error")
          }
        )
  }
  buyNow(index) {
    const data = {
      amount :  this.products[index].price*100
    }
    this.shopService.createOrder(data)
        .subscribe(
          res => {
            const options = {
              key: 'rzp_test_XeXDZ1bfrkFjXG',
              currency: "INR",
              name : this.products[index]['name'], 
              description: this.products[index]['description'],
              amount : data.amount,
              image: this.products[index]['thumbnail'],
              order_id :res['data']['raz_orderId'],
              prefill: {
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
              handler: (response) => {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                if(response.razorpay_payment_id) {
                  alert("Payment has been completed")
                }else {
                  alert("Payment has been not completed, contact support team")
                }
              }
            }
            var rzp1 = new Razorpay(options);
            rzp1.open();
          },
          err => {
            alert("Error")
          }
          )
  }

}
