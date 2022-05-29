import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-create',
  templateUrl: './product-category-create.component.html',
  styleUrls: ['./product-category-create.component.css']
})
export class ProductCategoryCreateComponent implements OnInit {

  validateForm!: FormGroup;
  statusSelected = "1";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productCategoryService: ProductCategoryService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      var formData = {
        name: this.validateForm.value.name,
        status: parseInt(this.validateForm.value.status)
      }
      this.productCategoryService
          .productCategoryCreate(formData)
          .subscribe(data => {
            this.router.navigate(['admin', 'product', 'category']);
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
