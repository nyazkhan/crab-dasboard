import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../components/login/login.service';
import { TostService } from '../providers/tost.service';

declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  headerRow = ['S.No ', 'Date', 'Name',
    'Phone No',
    'Email Id',
    'Description',
    'Status'];

  restaurantList: any = [];
  rejectionComment = '';
  constructor(
    private loginService: LoginService,
    private router: Router,
    private tostService: TostService,

  ) {

  }


  ngOnInit() {

    this.loginService.getData().subscribe((res) => {
      console.log(res);
      if (res.status === 200) {

        this.restaurantList = res.data;
      }
    });


  }

  approved(id) {
    this.loginService.approveRestaurant(id).subscribe((res) => {
      if (res.status === 200) {
        this.tostService.showNotificationSuccess('Restaurant Approved Successfuly');
      }
    });
  }

  onSubmit() {
    console.log(this.rejectionComment);
    $('#rejectModal').modal('hide')

  }
}

