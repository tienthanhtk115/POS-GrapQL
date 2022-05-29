import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  listData: ItemData[] = [
    {
      id: 1,
      name: 'Admin',
      email: "admin@gmail.com",
      phone: "0938269818",
      role: 'Admin',
      status: "Đang hoạt động"
    },
    {
      id: 2,
      name: 'Quản lý 1',
      email: "quanly@gmail.com",
      phone: "0978295645",
      role: 'Quản lý',
      status: "Đang hoạt động"
    },
    {
      id: 3,
      name: 'Nhân viên 1',
      email: "nhanvien@gmail.com",
      phone: "0976666822",
      role: 'Nhân viên',
      status: "Đang hoạt động"
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createClick(): void {
    this.router.navigateByUrl('/admin/user/add')
  }
}

interface ItemData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

