import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ExcelService } from 'src/app/services/excel.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  listProductData: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.productGetList();
  }

  productGetList(): void {
    this.productService
      .productGetList()
      .subscribe(data => {
        this.listProductData = data;
      });
  }

  createClick(): void {
    this.router.navigate(['admin', 'product', 'add']);
  }

  exportExcelClick(): void {
    console.log("todo");
    this.productService
      .productGetDataScaleExcel()
      .subscribe(data => {
        console.log(data.length);
        let arrayData: any[] = [];
        data.forEach(element => {
          arrayData.push({
            id: element.barcode,
            name: element.name,
            category: element.productCategory,
            price: element.salePrice,
            unit: element.unitName,
            description: element.description,
          });
        });
        this.excelService.exportAsExcelFile(arrayData, 'product' + new Date().toISOString());
      });
  }
}

