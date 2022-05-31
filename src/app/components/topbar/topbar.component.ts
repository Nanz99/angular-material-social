import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  userInfo: any = true
  isShow: boolean = false
  ngOnInit(): void {
    if (this.userService.user == null || this.userService.user == undefined) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.userInfo = JSON.parse(str);
        this.userService.user = JSON.parse(str)
      }
    }
    // if(this.userInfo !== null || this.userInfo !== undefined) {
    //   this.isShow = !this.isShow;
    // }

  }
  
  logout() {
    this.userService.user = null;
    localStorage.removeItem('user');
    this.isShow = !this.isShow;
    this.router.navigate(['/login']);

  }
}
