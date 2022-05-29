import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})

export class CustomerCreateComponent implements OnInit  {
  validateForm!: FormGroup;
  statusSelected = "1";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private partnerService: PartnerService,
  ) {}
  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      var objPartner = this.validateForm.value;
      objPartner.isCustomer = true;
      objPartner.isSupplier = false;
      this.partnerService
          .partnerCreate(objPartner)
          .subscribe(data => {
            this.router.navigate(['admin', 'customer'])
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
