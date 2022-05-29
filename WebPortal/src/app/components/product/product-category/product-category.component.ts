import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  listData: ProductCategory[] = [];

  constructor(
    private router: Router,
    private productCategoryService: ProductCategoryService,
  ) { }

  ngOnInit(): void {
    this.productCategoryGetList();
  }

  productCategoryGetList(): void {
    this.productCategoryService
      .productCategoryGetList()
      .subscribe(data => {
        this.listData = data;
      });
  }

  createClick(): void {
    this.router.navigate(['admin', 'product', 'category', 'add']);
  }
}
