import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partner } from 'src/app/models/partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  listPartner: Partner[] = [];

  constructor(
    private router: Router,
    private partnerService: PartnerService,
  ) { }

  ngOnInit(): void {
    this.partnerGetList();
  }

  partnerGetList(): void {
    this.partnerService
      .partnerGetList()
      .subscribe(data => {
        this.listPartner = data.filter(item => item.isSupplier == true);
      });
  }

  createClick(): void {
    this.router.navigate(['admin', 'supplier', 'add']);
  }
}
