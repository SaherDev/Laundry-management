import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ClientService } from 'src/app/Services/client.service';
import { Client } from 'src/app/Interfaces/Client';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
})
/** returnOrder component*/
export class ReturnOrderComponent {

  base;
  clients: Client[] = [];
  chosen_clients: Client[]
  loaded = false;

  //Constant cities
  rosh_pina: Client[] = [];
  tebrias_levnim: Client[] = [];
  hadnes_gamla: Client[] = [];
  kinneret_puria: Client[] = [];
  netofa_toran: Client[] = [];
  other: Client[] = [];
  /** returnOrder ctor */
  constructor(private http: HttpClient, private _ClientService: ClientService) {
    this.chosen_clients = new Array();
    //Get clients list
    let asyncResult = _ClientService.GetClients();
    asyncResult.then(result => {
      this.clients = result;
      for (var i = 0; i < this.clients.length; i++) {
        switch (this.clients[i].City) {
          case "ראש פינה": this.rosh_pina.push(this.clients[i]); break;
          case "טבריה": this.tebrias_levnim.push(this.clients[i]); break;
          case "לבנים": this.tebrias_levnim.push(this.clients[i]); break;
          case "חדנס": this.hadnes_gamla.push(this.clients[i]); break;
          case "גמלא": this.hadnes_gamla.push(this.clients[i]); break;
          case "כנרת": this.kinneret_puria.push(this.clients[i]); break;
          case "פוריה": this.kinneret_puria.push(this.clients[i]); break;
          case "מצפה נטופה": this.netofa_toran.push(this.clients[i]); break;
          case "טורעאן": this.netofa_toran.push(this.clients[i]); break;
          default: this.other.push(this.clients[i]); break;
        }
      }
      this.loaded = true;
    });
  }

  selectName(client: Client) {
    var x = document.getElementById(client.clientId.toString());
    switch (x.style.backgroundColor) {
      case 'rgb(0, 255, 128)': x.style.backgroundColor = null; this.chosen_clients.splice(this.chosen_clients.indexOf(client), 1); break;
      default: x.style.backgroundColor = '#00ff80'; this.chosen_clients.push(client); break;
    }
  }

  returnOrder(http: HttpClient) {
    if (this.chosen_clients.length <= 0) {
      return;
    }
    this._ClientService.FinishOrdersByClients(this.chosen_clients);
  }

}
