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
  selectedRestaurantId: any;
  selectedStatusId: any;
  status: any;
  updateStatus: any = {};
  selectedRestaurantIndex: any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private tostService: TostService,

  ) {

  }


  ngOnInit() {

    this.loginService.getData(1).subscribe((res) => {
      console.log(res);
      if (res.status === 200) { 

        this.restaurantList = res.data;

      }
    });


  }

  changeStatusOfRestaurant(id, statusId, status, index) {
    this.selectedRestaurantId = id;
    this.selectedStatusId = statusId;
    this.status = status;
    this.selectedRestaurantIndex = index;

  }
  approved(id, Status) {
    this.loginService.changeRestaurantStatus({

      userId: id,
      status: Status,

    }).subscribe((res) => {
      if (res.status === 200) {
        this.tostService.showNotificationSuccess('Restaurant Approved Successfuly');
      }
    });
  }
  onSubmit() {
    console.log(this.rejectionComment);

    this.updateStatus['userId'] = this.selectedRestaurantId;
    this.updateStatus['status'] = this.selectedStatusId;
    if (this.selectedStatusId != 5) {

      this.updateStatus['reason'] = this.rejectionComment;
    }
    this.loginService.changeRestaurantStatus(this.updateStatus).subscribe((res) => {
      if (res.status === 200) {
        this.tostService.showNotificationSuccess(this.status + ' Successfuly');
        this.restaurantList[this.selectedRestaurantIndex].status = this.selectedStatusId;
        this.rejectionComment = '';
        delete this.updateStatus;
        this.updateStatus = {};
      }
      $('#rejectModal').modal('hide');
    });
  }
  getIdOnClick(id) {
    this.selectedRestaurantId = id;

  }
}

