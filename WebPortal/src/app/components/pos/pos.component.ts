import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Order, OrderLine } from 'src/app/models/order';
import { OrderBankAccount } from 'src/app/models/order-bank-account';
import { Partner } from 'src/app/models/partner';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.services';
import { PartnerService } from 'src/app/services/partner.service';
import { ProductService } from 'src/app/services/product.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  validateForm!: FormGroup;
  paymentMethod = "cash";
  size: NzButtonSize = "large";

  listOrderLineData: OrderLine[] = [];

  listProductData: Product[] = [];
  productOptions: Product[] = [];

  partnerSelected?: string;
  listPartner: Partner[] = [];
  partnerOptions: Partner[] = [];
  listBankAccount: OrderBankAccount[] = [];
  productSelected?: string;
  bankAccount?: string;
  activeBankAccount: boolean = true;

  totalSalePrice = 0;

  constructor(
    private productService: ProductService,
    private partnerService: PartnerService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder,
    private transferService: TransferService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      partner: [null, [Validators.required]],
      payment: [null, [Validators.required]],
      account: [null],
      note: [null],
    });
    this.productGetList();
    this.partnerGetList();
    this.orderBankAccountGetList();
  }

  productGetList(): void {
    this.productService
      .productGetList()
      .subscribe(data => {
        this.listProductData = data;
        this.productOptions = data;
      });
  }

  partnerGetList(): void {
    this.partnerService
      .partnerGetList()
      .subscribe(data => {
        this.listPartner = data.filter(item => item.isCustomer == true);
        this.partnerOptions = data.filter(item => item.isCustomer == true);
      });
  }

  orderBankAccountGetList(): void {
    this.orderService
      .orderBankAccountGetList()
      .subscribe(data => {
        this.listBankAccount = data;
      });
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.productOptions = this.listProductData.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        || item.barcode.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  onChangePayment() {
    this.activeBankAccount = this.paymentMethod == 'cash';
  }

  clearSearch() {
    this.productSelected = "";
  }

  onSelect(e: any): void {
    var product = this.listProductData.find(x => x.id == e.nzValue);
    if (product) {
      this.listOrderLineData = [
        {
          productId: product.id,
          productName: product.name,
          productBarcode: product.barcode,
          salePrice: product.salePrice,
          quantity: 1,
        },
        ...this.listOrderLineData
      ];
      this.totalSalePrice += product.salePrice;
      this.clearSearch();
    }
  }

  deleteRow(id: number): void {
    this.listOrderLineData = this.listOrderLineData.filter(d => d.productId !== id);
    this.onChangeQuantity();
  }

  onChangePartner(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.partnerOptions = this.listPartner.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  onChangeQuantity() {
    let total = 0;
    this.listOrderLineData.forEach(e => {
      let q = e.quantity ? e.quantity : 0;
      total += q * e.salePrice;
    });
    this.totalSalePrice = total;
  }

  createCustomerClick(): void {
    this.router.navigate(['admin', 'customer', 'add']);
  }

  tranferStockOut(): void {
    let transferLines: any = Object.assign([], this.listOrderLineData);
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
      });
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      let orderLines: any = Object.assign([], this.listOrderLineData);
      orderLines.map((obj: any) => { delete obj.id, delete obj.productName, delete obj.productBarcode, obj.price = obj.salePrice, delete obj.salePrice });

      let orderObject = {
        bankAccountId: this.validateForm.value.account ? parseInt(this.validateForm.value.account) : null,
        cashType: this.validateForm.value.payment,
        partnerId: parseInt(this.validateForm.value.partner),
        note: this.validateForm.value.note,
        total: this.totalSalePrice,
        status: 0,
        orderLines: orderLines,
        date: '1900-01-01',
        bankAccount: null
      };


      this.orderService.orderCreate(orderObject)
        .subscribe(data => {
          this.router.navigate(['admin', 'order'])
        });
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
