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

    <div class="login">
      <div class="logo">
        <img src="../../../assets/login.png">
        
        <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)" >
          <h4>Login</h4>
        <div class="form-group input">
            <div class="input-left"><i class="fa fa-id-card"></i></div>
            <input class="form-control" type="email" placeholder="Email Address" name="email" formControlName="username">
        </div>
        <small *ngIf="form.controls.username.invalid && form.controls.username.touched">This is Required</small>

        <div class="form-group input">
          <div class="input-left"><i class="fa fa-key"></i></div>
            <input class="form-control" type="password" name="password"
            placeholder="Password"
            formControlName="password">
        </div>
        <small *ngIf="form.controls.password.invalid && form.controls.password.touched">This is Required</small>
        <br>
          <button type="submit">
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
  
  
  admin: User;
  

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(){
    this.loginService.getAdmin()
      .subscribe(data => this.admin = data );
    
    this.loginService.getUsers()
      .subscribe(data => this.users = data);
  }

  
  onSubmit(value: User) {

    if(value.username === this.admin.username && value.password === this.admin.password){
      this.router.navigate(['/admin']);
      localStorage.setItem("user", this.admin.username);
    }
    
    else{
        
      this.users.map((item) => {
        if(value.username === item.username && value.password === item.password){
          this.router.navigate(['/users']);
          localStorage.setItem("user", item.username);
        }
        else{
          
        }
      })

    }
 
  }

}