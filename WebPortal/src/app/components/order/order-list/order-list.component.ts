import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  listOrderData: Array<any> = [];

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() { 
    this.orderGetList();
  }

  createClick(): void {
    this.router.navigate(['pos']);
  }

  orderGetList(): void {
    this.orderService
      .orderGetList()
      .subscribe(data => {
        this.listOrderData = [...data];
        this.listOrderData.forEach(function (element) {
          element.name = 'DH' + element.id;
          element.expand = false;
        });
      });
  }

} 