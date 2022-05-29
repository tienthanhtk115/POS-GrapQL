import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {  
    this._router.navigate(['admin', 'dashboard'])
  }

  signin(){
    this._router.navigate(['signin'])
  }

}
