import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog-app/services/blog.service';
import { LoginService } from 'src/app/blog-app/services/login.service';
import { User } from '../../interfaces/auth-form.interface';

@Component({
  selector: 'app-compose-blog',
  template: `
    <h2>Blog App</h2>
      <div class="compose">
        <div class="flex">
          <img *ngIf="imageUrl" [src]="imageUrl">
          <textarea name="" id="" cols="70" rows="4" placeholder="What's Happenning?"></textarea>
        </div>

        <div>
          <i class="far fa-images"></i>
          <i class="fa fa-camera"></i>
          <i class="fa fa-smile"></i>
          <button class="compose-button">Compose</button>
        </div>
      </div>
  `,
  styleUrls: ['./compose-blog.component.css']
})
export class ComposeBlogComponent implements OnInit {

  constructor(private loginService: LoginService){}

  user: User;

  username: string;
  imageUrl: string;
  
  ngOnInit(){
    this.loginService.getUsers()
      .subscribe(data => {
      data.map(item => {
        if(item.username === localStorage.getItem('user')){
          this.user = item;
        }
        
      })
      data.map(users => {
            const currentUser = localStorage.getItem('user'); 
            if(users.username === currentUser){
              this.username = users.username;
                    if(users.imageUrl){
                      this.imageUrl = users.imageUrl;
                    }
                    else{
                      this.imageUrl = "../../../assets/dp.png"
                    }
            }
          });
      });
  }
}
