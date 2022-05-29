import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  listData: Warehouse[] = [];

  constructor(
    private router: Router,
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit(): void {
    this.warehouseGetList();
  }

  warehouseGetList(): void {
    this.warehouseService
      .warehouseGetList()
      .subscribe(data => {
        this.listData = data;
      });
  }

  createClick(): void {
    this.router.navigate(['admin', 'stock', 'warehouse', 'add'])
  }

}
