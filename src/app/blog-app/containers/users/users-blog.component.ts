import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'users-blog',
  template:`
  <div class="flex container">
        <navbar-blog></navbar-blog>
        <app-blogs></app-blogs>
        <app-rigthbar></app-rigthbar>
  </div>
  ` 
  ,
  styleUrls: ['./users-blog.component.css']
})
export class UsersBlogComponent {
  constructor(private userService: AuthService){}
  user = localStorage.getItem('user');

  ngOnInit(){
    this.userService.getUserDetails().subscribe(user => {
      
    });
  }
}
