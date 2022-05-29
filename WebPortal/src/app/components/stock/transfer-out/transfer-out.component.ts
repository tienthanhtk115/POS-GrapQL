import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Transfer, TransferLine } from 'src/app/models/transfer';
import { ProductService } from 'src/app/services/product.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer-out',
  templateUrl: './transfer-out.component.html',
  styleUrls: ['./transfer-out.component.css']
})
export class TransferOutComponent implements OnInit {

  listOfParentData: Transfer[] = [];
  listOfChildrenData: TransferLine[] = [];
  listProductData: Product[] = [];

  constructor(
    private router: Router,
    private transferService: TransferService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.productService
      .productGetList()
      .subscribe(data => {
        this.listProductData = data;
        this.transferGetList();
      });
  }

  transferGetList(): void {
    let listOfParentData: Array<any> = [];

    // this.listOfChildrenData = [];
    this.transferService
      .transferGetList()
      .subscribe(data => {
        data = data.filter(obj => obj.type == "out");
        data.forEach((item: any) => {
          listOfParentData.push({
            id: item.id,
            code: item.code + item.id,
            reference: item.reference,
            date: item.date,
            partnerId: item.partnerId,
            warehouseSourceId: item.warehouseSourceId,
            warehouseDestId: item.warehouseDestId,
            status: item.status,
            expand: false,
            transferLines: [...item.transferLines.map((line: any) => {
              let product: string | undefined = this.listProductData.find(obj => line.productId == obj.id)?.name;
              return {
                id: line.id,
                product: product,
                productId: line.productId,
                quantity: line.quantity,
              }
            })]
          });
        });
        this.listOfParentData = [...listOfParentData];
        // this.listOfChildrenData = [...listOfChildrenData];
      });
  }

  createClick(): void {
    this.router.navigate(['admin', 'stock', 'transfer-out', 'add']);
  }
}
