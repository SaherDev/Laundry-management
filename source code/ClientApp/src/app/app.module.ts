import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { PickUpComponent } from './Components/pick-up/pick-up.component';
import { DatePipe } from '@angular/common';
import { ReturnOrderComponent } from './Components/return-order/return-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Services/auth-guard';
import { LoginService } from './Services/login.service';
import { OrderService } from './Services/order.service';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InventoryComponent,
    PickUpComponent,
    ReturnOrderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: InventoryComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'pick-up', component: PickUpComponent, canActivate: [AuthGuard] },
      { path: 'return-order', component: ReturnOrderComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'inventory' }
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [DatePipe, LoginService, OrderService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
