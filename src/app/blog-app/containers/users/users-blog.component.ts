import { Component } from '@angular/core';

@Component({
  selector: 'users-blog',
  template:`
  <div class="flex evenly-flex">
        <navbar-blog></navbar-blog>
        <app-blogs></app-blogs>
        <app-rigthbar></app-rigthbar>
  </div>
  ` 
  ,
  styleUrls: ['./users-blog.component.css']
})
export class UsersBlogComponent {
}
