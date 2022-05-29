import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-modify',
  templateUrl: './product-category-modify.component.html',
  styleUrls: ['./product-category-modify.component.css']
})
export class ProductCategoryModifyComponent implements OnInit {
  id!: number;
  productCategoryData?: ProductCategory;
  validateForm!: FormGroup;
  statusSelected = "1";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.productCategoryGetById(this.id);

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });

  }

  productCategoryGetById(id: number) {
    this.productCategoryService
        .productCategoryGetById(id)
        .subscribe(data => {
          this.productCategoryData = data;
        });;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      var formData = {
        id: this.id,
        name: this.validateForm.value.name,
        status: parseInt(this.validateForm.value.status)
      }

      this.productCategoryService
          .productCategoryModify(formData)
          .subscribe(data => {
            this.router.navigate(['admin', 'product', 'category'])
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
