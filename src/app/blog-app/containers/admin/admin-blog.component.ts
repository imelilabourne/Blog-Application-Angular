import { Component} from '@angular/core';


@Component({
  selector: 'admin-blog',
  template: `
  <div>
    <admin-nav></admin-nav>
    <div class="content">
        <p>Manage Posts</p>
        <manage-posts></manage-posts>
        <hr>
        <p>Users</p>
        <manage-users></manage-users>
        <hr>
        <div class="link"><a routerLink="/users">Go to home</a></div>
        <div class="link"><a routerLink="/login" (click)="removeUser()" class="logout">Logout</a></div>

        <!-- <p>Manage Topics</p> -->
        <!-- <manage-posts></manage-posts> -->
    </div>
  </div>
  `,
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent {
  removeUser(){
    localStorage.clear()
}

}
