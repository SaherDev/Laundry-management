import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Order } from 'src/app/Interfaces/Order';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: [`

.positive {
}

.negative {
    background-color: #80b3ff;
}

.mat-success {
    background-color: #00ff80;
    color: white;
}
table {
  width: 100%;
}

tr.example-detail-row {
  height: 0;
}

tr.example-element-row:not(.example-expanded-row):hover {
  background: #f5f5f5;
}

tr.example-element-row:not(.example-expanded-row):active {
  background: #efefef;
}

.example-element-row td {
  border-bottom-width: 0;
}

.example-element-detail {
  overflow: hidden;
  display: flex;
}

.example-element-diagram {
  min-width: 80px;
  border: 2px solid black;
  padding: 8px;
  font-weight: lighter;
  margin: 8px 0;
  height: 104px;
}

.example-element-symbol {
  font-weight: bold;
  font-size: 40px;
  line-height: normal;
}

.example-element-description {
  padding: 16px;
}

.example-element-description-attribution {
  opacity: 0.5;
}
`],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


/** Inventory component*/
export class InventoryComponent {

  columnsToDisplay = ['clientName', 'dateIN', 'amount'];
  expandedElement: Order;


  public orders: Order[] = [];
  loaded = false;

  constructor(private _OrderService: OrderService, private router: Router) {
    let asyncResult = _OrderService.GetCurrentOrders();
    asyncResult.then(result => {
      this.orders = result;
      this.loaded = true;
    });
  }


  readyBtn(order: Order) {
    order.status = 1;
    this._OrderService.SetOrderStatus(order);
  };

  finishBtn(order: Order) {
    order.status = 2;
    this._OrderService.SetOrderStatus(order);
  }

}
