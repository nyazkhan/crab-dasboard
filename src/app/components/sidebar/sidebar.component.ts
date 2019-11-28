import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  list: SidebarList[];
  name: string;
  picUrl: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {

    this.list = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
    ];


  }





  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

export interface SidebarList {
  name: string;
  icon: string;
  route: string;
}


