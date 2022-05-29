import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Partner } from 'src/app/models/partner';
import { Product } from 'src/app/models/product';
import { Warehouse } from 'src/app/models/warehouse';
import { PartnerService } from 'src/app/services/partner.service';
import { ProductService } from 'src/app/services/product.service';
import { TransferService } from 'src/app/services/transfer.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

interface ItemData {
  count: number;
  id: string;
  product: string;
  productId: number;
  quantity: number;
}

@Component({
  selector: 'app-transfer-out-create',
  templateUrl: './transfer-out-create.component.html',
  styleUrls: ['./transfer-out-create.component.css']
})
export class TransferOutCreateComponent implements OnInit {
  validateForm!: FormGroup;
  selectedValue = true;
  count = 1;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  productSelected?: string;
  listProductData: Product[] = [];
  productOptions: Product[] = [];

  listPartner: Partner[] = [];
  listWarehouse: Warehouse[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private partnerService: PartnerService,
    private transferService: TransferService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      warehouseSourceId: [null],
      warehouseDestId: [null],
      date: [null],
      partnerId: [null],
      reference: [null]
    });
    this.productGetList();
    this.warehouseGetList();
    this.partnerGetList();
  }

  productGetList(): void {
    this.productService
      .productGetList()
      .subscribe(data => {
        this.listProductData = data;
        this.productOptions = data;
      });
  }

  warehouseGetList(): void {
    this.warehouseService
      .warehouseGetList()
      .subscribe(data => {
        this.listWarehouse = data;
      });
  }

  partnerGetList(): void {
    this.partnerService
      .partnerGetList()
      .subscribe(data => {
        this.listPartner = data.filter(item => item.isCustomer == true);
      });
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.productOptions = this.listProductData.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        || item.barcode.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  onSelect(e: any): void {
    this.listOfData = [
      {
        count: this.count,
        id: `${this.count}`,
        product: e.nzLabel,
        productId: e.nzValue,
        quantity: 1,
      },
      ...this.listOfData
    ];
    this.count++;
  }

  transferCreate(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      let transferLines: any = Object.assign([], this.listOfData);
      transferLines.map((obj: any) => { delete obj.id; delete obj.product, delete obj.count });
      var transferObject = {
        code: "XK",
        reference: this.validateForm.value.reference,
        warehouseSourceId: 0,
        warehouseDestId: parseInt(this.validateForm.value.warehouseDestId),
        date: this.validateForm.value.date,
        partnerId: parseInt(this.validateForm.value.partnerId),
        type: "out",
        note: "",
        status: "1",
        transferLines: transferLines
      }

      this.transferService
        .transferCreate(transferObject)
        .subscribe(data => {
          this.router.navigate(['admin', 'stock', 'transfer-out'])
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

