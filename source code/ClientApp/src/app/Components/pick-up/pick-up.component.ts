import { Component, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Client } from 'src/app/Interfaces/Client';
import { Order } from 'src/app/Interfaces/Order';
import { OrderService } from 'src/app/Services/order.service';
import { ClientService } from 'src/app/Services/client.service';
@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styles: [`

mat-label {
  font-size: 20px;
}

.mat-success {
    background-color: #00ff80;
    color: white;
    font-size: 48px;
}

.mat-fail {
    background-color: #ff4d4d;
    color: white;
    font-size: 48px;
}

    .mat-raised-button.large {
    width: 200px;
    height: 75px;
    line-height: 48px;

    .mat-raised-button {
      font-size: 48px;
      width: 48px;
      height: 48px;
      line-height: 48px;
    }
  }
`]
})
/** pick-up component*/
export class PickUpComponent {

  //vars
  btnClicked;
  base;
  order: Order;
  clients: Client[]
  //amounts
  bigbag = 0;
  smallbag = 0;
  bag = 0;
  pile = 0;

  /** pick-up ctor */
  constructor(private http: HttpClient, private _OrderService: OrderService, private _ClientService: ClientService) {
    this.order = {
      orderId: 0,
      clientId: null,
      clientName: "",
      amount: "",
      dateIN: "",
      dateOUT: "",
      status: 0
    };

    //Get clients list
    let asyncResult = _ClientService.GetClients();
    asyncResult.then(result => {
      this.clients = result;
    });
  }

  PickupOrder() {
    if (this.bigbag == 0 && this.bag == 0 && this.smallbag == 0 && this.pile == 0) return;
    this.btnClicked = true;
    //Prepare data
    var amounts = "";
    if (this.bigbag > 0) {

      amounts += " ביגבגים ";
      amounts += this.bigbag;
      amounts += " , ";
    }
    if (this.bag > 0) {

      amounts += " שקים ";
      amounts += this.bag;
      amounts += " , ";
    }
    if (this.smallbag > 0) {

      amounts += " שקיות ";
      amounts += this.smallbag;
      amounts += " , ";
    }
    if (this.pile > 0) {
      amounts += this.pile;
      amounts += " ערימות ";
      amounts += " , ";
    }
    this.order.amount = amounts;

    this._OrderService.AddOrder(this.order);

  }

  incAmount(which: string) {
    switch (which) {
      case 'bag': this.bag++; break;
      case 'bigbag': this.bigbag++; break;
      case 'smallbag': this.smallbag++; break;
      case 'pile': this.pile++; break;
      default: break;
    }
  }

  decAmount(which: string) {
    switch (which) {
      case 'bag': if (this.bag >= 1) this.bag--; break;
      case 'bigbag': if (this.bigbag >= 1) this.bigbag--; break;
      case 'smallbag': if (this.smallbag >= 1) this.smallbag--; break;
      case 'pile': if (this.pile >= 1) this.pile--; break;
      default: break;
    }
  }
}
