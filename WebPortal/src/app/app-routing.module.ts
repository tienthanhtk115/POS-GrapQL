import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './components/supplier/supplier-create/supplier-create.component';
import { TransferInComponent } from './components/stock/transfer-in/transfer-in.component';
import { TransferOutComponent } from './components/stock/transfer-out/transfer-out.component';
import { StockInventoryComponent } from './components/stock/stock-inventory/stock-inventory.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { ProductCategoryComponent } from './components/product/product-category/product-category.component';
import { ProductCategoryCreateComponent } from './components/product/product-category-create/product-category-create.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductCategoryModifyComponent } from './components/product/product-category-modify/product-category-modify.component';
import { TransferInCreateComponent } from './components/stock/transfer-in-create/transfer-in-create.component';
import { TransferOutCreateComponent } from './components/stock/transfer-out-create/transfer-out-create.component';
import { PosComponent } from './components/pos/pos.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: { showHeader: false, showSidebar: false } 
  },
  { 
    path: 'pos', 
    component: PosComponent,
    data: { showHeader: false, showSidebar: false } 
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      { 
        path: 'dashboard', 
        component: DashboardComponent 
      },
      { 
        path: 'order', 
        children: [
          {
            path: '', component: OrderListComponent
          },
        ]
      },
      { 
        path: 'product', 
        children: [
          {
            path: '', component: ProductListComponent
          },
          {
            path: 'add', component: ProductCreateComponent
          },
          {
            path: 'category',
            children: [
              {
                path: '', component: ProductCategoryComponent
              },
              {
                path: 'add', component: ProductCategoryCreateComponent
              },
              {
                path: ':id', component: ProductCategoryModifyComponent
              },
            ]
          },
        ]
      },
      { 
        path: 'customer', 
        children: [
          {
            path: '', component: CustomerListComponent
          },
          {
            path: 'add', component: CustomerCreateComponent
          },
        ]
      },
      { 
        path: 'supplier', 
        children: [
          {
            path: '', component: SupplierListComponent
          },
          {
            path: 'add', component: SupplierCreateComponent
          },
        ]
      },
      { 
        path: 'stock', 
        children: [
          {
            path: 'transfer-in',
            children: [
              {
                path: '', component: TransferInComponent
              },
              {
                path: 'add', component: TransferInCreateComponent
              },
            ]
          },
          {
            path: 'transfer-out',
            children: [
              {
                path: '', component: TransferOutComponent
              },
              {
                path: 'add', component: TransferOutCreateComponent
              },
            ]
          },
          {
            path: 'inventory', component: StockInventoryComponent
          },
          {
            path: 'warehouse',
            children: [
              {
                path: '', component: StockListComponent
              },
              {
                path: 'add', component: StockCreateComponent
              },
            ]
          },
        ]
      },
      { 
        path: 'user', 
        children: [
          {
            path: '', component: UserListComponent
          },
          {
            path: 'add', component: UserCreateComponent
          },
        ]
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
