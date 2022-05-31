import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  vitri: Object = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  };
  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
        ),
      ],
    ],
  });
  handleLogin(e: any){
    e.preventDefault();
    this.userService
      .getUser(this.loginForm.value.email)
      .then((res: any) => {
        console.log(res);
        if (res.length == 0) {
          console.log('account does not exist');
          this.snackbar.open('Account does not exist', 'ok', this.vitri);
        } else {
          if (res[0].password === this.loginForm.value.password) {
            console.log('matched');
            this.snackbar.open('Login successful', 'ok', this.vitri);
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts']);
          } else {
            console.log('incorrect password');
            this.snackbar.open('Incorrect password', 'ok', this.vitri);
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  login() {
    this.userService
      .getUser(this.loginForm.value.email)
      .then((res: any) => {
        console.log(res);
        if (res.length == 0) {
          console.log('account does not exist');
          this.snackbar.open('Account does not exist', 'ok', this.vitri);
        } else {
          if (res[0].password === this.loginForm.value.password) {
            console.log('matched');
            this.snackbar.open('Login successful', 'ok', this.vitri);
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts']);
          } else {
            console.log('incorrect password');
            this.snackbar.open('Incorrect password', 'ok', this.vitri);
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
