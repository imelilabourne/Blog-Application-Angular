import { Component } from '@angular/core';

@Component({
  selector: 'users-blog',
  template:`
    <div class="main">
        <navbar-blog></navbar-blog>
        <post-blog></post-blog>
        <home-blog></home-blog>
    </div>
  ` 
  ,
  styleUrls: ['./users-blog.component.css']
})
export class UsersBlogComponent {
}
