import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../interfaces/auth-form.interface';

@Component({
    selector: 'sign-blog',
    styleUrls: ['signup.component.css'],
    template: `
    <div class="login">
      <div class="logo">
        <div class="img-wrapper">
          <img src="../../../assets/login.png">
        </div>
        <form [formGroup] = "signupForm" (ngSubmit) = "onSubmit()">
          <h4>Sign Up</h4>
          <div class="form-group input">
                <input #fname class="form-control" placeholder="First Name" type="email" name="firstname" formControlName="firstname" >
                <small *ngIf="signupForm.controls.firstname.invalid && signupForm.controls.firstname.touched">This is Required</small>
          </div>

         <div class="form-group input">
                <input class="form-control" placeholder="Last Name" type="email" name="lastname" formControlName="lastname" >
                <small *ngIf="signupForm.controls.lastname.invalid && signupForm.controls.lastname.touched">This is Required</small>
         </div>
        <div class="form-group input">
            <input class="form-control" placeholder="Username" type="email" name="username" formControlName="username">
            <small *ngIf="signupForm.controls.username.invalid && signupForm.controls.username.touched">This is Required</small>
        </div>
        <div class="form-group input ">
            <input class="form-control" placeholder="Password" type="password"  [type]="pass" name="password" formControlName="password">
            <div *ngIf="signupForm.controls.password.dirty"><input class="showPass" type="checkbox" (click)="myFunction()"> Show Password</div>
            <small *ngIf="signupForm.controls.password.invalid && signupForm.controls.password.touched">This is Required (8 minimum characters)</small>  
          </div>
        <div class="form-group input">
          <label>
           <!-- Confirm Password -->
            <input class="form-control" placeholder="Confirm Password" type="password" name="password" formControlName="passwordConfirm">
            <small *ngIf="signupForm.controls.passwordConfirm.invalid && signupForm.controls.passwordConfirm.touched">This is Required</small>
          </label>
        </div>
          <button class="btn btn-block" type="submit" [disabled]="signupForm.invalid" >
             Sign up
          </button>
            <div class="signup"><a routerLink="/login">I already have an account</a></div>
      </form>
      </div>
    </div>
    `
})

export class SignupBlogComponent{
  constructor(private fb: FormBuilder, private loginService: LoginService ){}
  id: number;
  status: boolean = false;
  pass = "password";
  signupForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ["", Validators.required]
  })

  onSubmit(){
    const pass = this.signupForm.get('password');
    const confirm = this.signupForm.get('passwordConfirm');

    if(pass.value === confirm.value){
      this.loginService.signUp(this.signupForm.value)
      .subscribe((data: User) => console.log(data));
    }
    else{
      alert("Mali ang password");
    }


  }

  myFunction(){
    // const temp = this.signupForm.get('password');
    if(this.status == false){
      this.pass = "text"
      this.status = true;
    }
    else{
      this.pass = "password"
      this.status = false
    }
  }
}