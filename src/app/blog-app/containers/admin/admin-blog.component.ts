import { Component} from '@angular/core';


@Component({
  selector: 'admin-blog',
  template: `
  <div>
    <admin-nav></admin-nav>
    <div class="content">
    <a routerLink="/userslist">View users list</a>

        <p>Manage Posts</p>
        <manage-posts></manage-posts>
        <hr>
    </div>
  </div>
  `,
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent {
  

}
