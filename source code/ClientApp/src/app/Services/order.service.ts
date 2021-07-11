import { Injectable, Inject } from '@angular/core';
import { Order } from '../Interfaces/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "http://localhost:4201/api/";
  base;
  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl;
  }

  public async GetCurrentOrders() {
    return this.http.get<Order[]>(this.url + 'orders').toPromise();
  }


  public async AddOrder(order: Order) {
    // Http Headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    //Date time now
    const currentDate = new Date();
    var myDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

    //Prepare data
    order.dateIN = myDate;
    var dataToSend = {
      clientId: order.clientId,
      amount: order.amount,
      dateIN: order.dateIN,
      status: 0
    }
    //Send data
    order.clientId = +order.clientId;

    let response = await this.http.post(this.url + "orders", JSON.stringify(dataToSend), httpOptions).toPromise().then(
      cback => this.router.navigate(['inventory']),
      error => console.log(error)
    );
  }

  public async SetOrderStatus(order: Order) {
    // Http Headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    if (order.status == 2) {
      //Date time now
      const currentDate = new Date();
      order.dateOUT = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
    }
    var test = this.http.put(this.url + "orders/" + order.orderId, JSON.stringify(order), httpOptions);
    test.subscribe((response) => {
      window.location.href = this.base + 'inventory';
    });
  }
}
