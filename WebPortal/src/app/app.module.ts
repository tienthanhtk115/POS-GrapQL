import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { NgChartsModule } from 'ng2-charts';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductModifyComponent } from './components/product/product-modify/product-modify.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './components/supplier/supplier-create/supplier-create.component';
import { ProductCategoryComponent } from './components/product/product-category/product-category.component';
import { TransferInComponent } from './components/stock/transfer-in/transfer-in.component';
import { TransferOutComponent } from './components/stock/transfer-out/transfer-out.component';
import { StockInventoryComponent } from './components/stock/stock-inventory/stock-inventory.component';
import { TransferInCreateComponent } from './components/stock/transfer-in-create/transfer-in-create.component';
import { TransferOutCreateComponent } from './components/stock/transfer-out-create/transfer-out-create.component';
import { ProductCategoryCreateComponent } from './components/product/product-category-create/product-category-create.component';
import { ProductCategoryModifyComponent } from './components/product/product-category-modify/product-category-modify.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { PosComponent } from './components/pos/pos.component';
import { environment } from 'src/environments/environment';
import { ExcelService } from './services/excel.service';

registerLocaleData(vi);

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgChartsModule,
    ApolloModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzDatePickerModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzAutocompleteModule,
    NzTypographyModule,
    NzInputNumberModule,
    NzRadioModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    OrderListComponent,
    OrderDetailComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductModifyComponent,
    StockListComponent,
    StockCreateComponent,
    UserCreateComponent,
    UserListComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    ProductListComponent,
    TransferInComponent,
    TransferOutComponent,
    StockInventoryComponent,
    ProductCategoryComponent,
    TransferInCreateComponent,
    TransferOutCreateComponent,
    ProductCategoryCreateComponent,
    ProductCategoryModifyComponent,
    PosComponent
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.apiEndpoint,
            // uri: 'https://localhost:7264/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
    { provide: NZ_I18N, useValue: vi_VN },
    ExcelService
  ],
  bootstrap: [AppComponent], 
})
export class AppModule { }
