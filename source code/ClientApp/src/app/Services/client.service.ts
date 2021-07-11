import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Client } from "../Interfaces/Client";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  url = "http://localhost:4201/api/";
  base;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl) {
    this.base = baseUrl;
  }

  public async GetClients() {
    return this.http.get<Client[]>(this.url + "clients").toPromise();
  }

  public FinishOrdersByClients(clients: Client[]) {
    // Http Headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    for (var i = 0; i < clients.length; i++) {
      var test = this.http.put(
        this.url + "clients/" + clients[i].clientId,
        {},
        httpOptions
      );
      test.subscribe();
    }
    window.location.href = this.base + 'inventory';
  }
}
