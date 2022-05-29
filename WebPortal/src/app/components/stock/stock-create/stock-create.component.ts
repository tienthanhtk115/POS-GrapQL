import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {
  validateForm!: FormGroup;
  statusSelected = "1";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private warehouseService: WarehouseService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      var formData = {
        code: this.validateForm.value.code,
        name: this.validateForm.value.name,
        address: this.validateForm.value.address,
        status: this.validateForm.value.status
      }
      this.warehouseService
          .warehouseCreate(formData)
          .subscribe(data => {
            this.router.navigate(['admin', 'stock', 'warehouse'])
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
