import { Component, OnInit } from '@angular/core';


import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { TostService } from 'src/app/providers/tost.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  // userTypes = ["management", "superadmin"];
  user = {
    email: 'admin@crab.com',
    password: 'admin@123'
  };
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private tostService: TostService,
  ) {

  }

  ngOnInit() {
  }








  // user loging function

  onSubmit() {

    this.loginservice.login(this.user).subscribe((res) => {
      console.log(res);
      if (res.data) {
        for (const key of Object.keys(res.data)) {
          localStorage.setItem(key, res.data[key]);
        }
        this.tostService.showNotificationSuccess('Logging Successfuly');
      }
      this.router.navigateByUrl('/dashboard');
    });
  }

}
