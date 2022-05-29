import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partner } from 'src/app/models/partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
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
        this.listPartner = data.filter(item => item.isCustomer == true);
      });
  }

  createClick(): void {
    this.router.navigate(['admin', 'customer', 'add']);
  }
}
