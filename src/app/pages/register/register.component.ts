import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/utils/Validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createAccountForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(10)]],
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
      confirmPassword: ['', [Validators.required]],
      phoneNumber : ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')],
    }
  );
  handleSubmit(e: any) {
    e.preventDefault();
   this.userService
     .createNewUser(this.createAccountForm.value)
     .then((res) => {
       console.log(res);
       this.userService.user = res;
       localStorage.setItem('user', JSON.stringify(res));
       this.router.navigate(['/login']);
     })
     .catch((err) => {
       console.log(err);
     });
  }

  create() {
    this.userService
      .createNewUser(this.createAccountForm.value)
      .then((res) => {
        console.log(res);
        this.userService.user = res;
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
