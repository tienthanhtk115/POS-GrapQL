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
  position: string;
  lotNumber: string;
  expiryDate: string;
  numDayWarning: number;
}

@Component({
  selector: 'app-transfer-in-create',
  templateUrl: './transfer-in-create.component.html',
  styleUrls: ['./transfer-in-create.component.css']
})
export class TransferInCreateComponent implements OnInit {
  validateForm!: FormGroup;
  selectedValue = true;
  count = 1;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  productSelected?: string;
  listProductData: Product[] = [];
  productOptions: Product[] = [];

  listSupplier: Partner[] = [];
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
        this.listSupplier = data.filter(item => item.isSupplier == true);
      });
  }

  transferCreate(): void {
    if (this.validateForm.valid) {

      let transferLines: any = Object.assign([], this.listOfData);
      transferLines.map((obj: any) => { delete obj.id; delete obj.product, delete obj.count });
      var transferObject = {
        code: "NK",
        reference: this.validateForm.value.reference,
        warehouseSourceId: parseInt(this.validateForm.value.warehouseSourceId),
        warehouseDestId: parseInt(this.validateForm.value.warehouseDestId),
        date: this.validateForm.value.date,
        partnerId: parseInt(this.validateForm.value.partnerId),
        type: "in",
        note: "",
        status: "1",
        transferLines: transferLines
      }

      this.transferService
        .transferCreate(transferObject)
        .subscribe(data => {
          this.router.navigate(['admin', 'stock', 'transfer-in'])
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
        position: "",
        lotNumber: "",
        expiryDate: "",
        numDayWarning: 0
      },
      ...this.listOfData
    ];
    this.count++;
    this.productSelected = "";
  }
}