import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';

import { User } from '../interfaces/auth-form.interface';

@Component({
  selector: 'login-blog',
  styleUrls: ['login.component.css'],
  template: `
<div class="alert alert-danger" *ngIf="showMsg">You are not registered, please sign up
        </div>
    <div class="login">
      <div class="logo">
        <img src="../../../assets/login.png">
        
        <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)" >
          <h4>Login</h4>


        <div class=" input">
            <div class="input-left"><i class="fa fa-id-card"></i></div>
            <input class="form-control feedback" type="email" placeholder="Email Address" name="email" formControlName="username">
        </div>

        <small *ngIf="form.controls.username.invalid && form.controls.username.touched">Email Address is Required</small>

          <div class=" input">
            <div class="input-left"><i class="fa fa-key"></i></div>
              <input class="form-control" type="password" name="password"
              placeholder="Password"
              formControlName="password">
        </div>
        <small *ngIf="form.controls.password.invalid && form.controls.password.touched">Password is Required</small>

        <br>
          <button type="submit" [disabled]= "form.invalid">
             Login
          </button>
          <div class="signup"><a routerLink="/signup">Create New Account</a></div>
      </form>
      </div>
    </div>
    
  `
})
export class LoginComponent {
  constructor(private fb:FormBuilder, 
    private loginService: LoginService, 
    private router: Router, 
    private auth: AuthService){}
  
  users: User[];
  
  showMsg: boolean = false;
  admin: User;
  

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  
  onSubmit(value: User) {

    // this.loginService.getAdmin()
    // .subscribe(data => {
    //   if(value.username === data.username && value.password === data.password){
    //     this.router.navigate(['/admin']);
    //     localStorage.setItem("user", data.username);
    //   }
    // })
    
    
    this.loginService.getUsers()
    .subscribe(data => {
      data.map((item) => {
        if(value.username === item.username && value.password === item.password && item.role === 1){
          this.router.navigate(['/users']);
          localStorage.setItem("user", item.username);
        }
        else if(value.username === item.username && value.password === item.password && item.role === 0){
          this.router.navigate(['/admin']);
          localStorage.setItem("user", item.username);
        }
        else{
          this.showMsg = true;
        }
      })
    })
        
    }
 

}