import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.css']
})
export class StockInventoryComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 1; i < 6; i++) {
      data.push({
        id: `${i}`,
        barcode: `SP000${i}`,
        name: `Sản phẩm ${i}`,
        warehouse: "Kho hàng 1",
        qty_onhand: i * 2
      });
    }
    this.listOfData = data;
    this.updateEditCache();
  }

}

interface ItemData {
  id: string;
  barcode: string;
  name: string;
  warehouse: string;
  qty_onhand: number;
}