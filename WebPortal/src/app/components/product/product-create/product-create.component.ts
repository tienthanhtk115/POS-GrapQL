import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductUnit } from 'src/app/models/product-unit';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  validateForm!: FormGroup;

  listProductCategory?: ProductCategory[] = [];
  salePrice = 0;
  costPrice = 0;
  statusSelected = "1";
  listProductUnit: ProductUnit[] = [];
  productUnit: number = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      barcode: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      costPrice: [null, [Validators.required]],
      salePrice: [null, [Validators.required]],
      status: [null, [Validators.required]],
      unit:[null, [Validators.required]]
    });

    this.productCategoryGetList();
    this.productUnitGetList();

  }

  productCategoryGetList(): void {
    this.productCategoryService
      .productCategoryGetList()
      .subscribe(data => {
        this.listProductCategory = data;
      });
  }

  productUnitGetList(): void {
    this.productCategoryService
      .productUnitGetList()
      .subscribe(data => {
        if (data.length > 0) {
          this.listProductUnit = data;
          this.productUnit = data[0].id;
        }
      });
  }



  submitForm(): void {
    if (this.validateForm.valid) {
      var productObject = {
        name: this.validateForm.value.name,
        barcode: this.validateForm.value.barcode,
        productCategory: parseInt(this.validateForm.value.productCategory),
        salePrice: parseInt(this.validateForm.value.salePrice),
        costPrice: parseInt(this.validateForm.value.costPrice),
        status: this.validateForm.value.status,
        unitId: this.validateForm.value.unit
      }

      this.productService
        .productCreate(productObject)
        .subscribe(data => {
          this.router.navigate(['admin', 'product'])
        });;

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
