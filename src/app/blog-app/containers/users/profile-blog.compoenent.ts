import { Component } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { LoginService } from "../../services/login.service";
import { User } from "../interfaces/auth-form.interface";
import { Blog } from "../interfaces/composeBlog.interface";

@Component({
    selector: 'profile-blog',
    styleUrls: ['profile-blog.component.css'],
    template: `
    <navbar-blog></navbar-blog>
    <div class="container">
        <div class="top row bg">
            <div class="col-md-3">
                <img alt="display-photo" src="../../../assets/dp.png">
                <!-- <h2>elilypad</h2> -->
            </div>
            <div>
                <h3>{{ user?.firstname }} {{ user?.lastname }}</h3>
                <p> @{{user?.username }}</p>
                <p>{{ user?.email }}</p>
            </div>
        </div>
        
    </div>
    <div class="row bottom">
            <h3>My Posts</h3>
     
    <div class="status">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let blog of blogs ; let i=index">
            <th scope="row">{{i + 1}}</th>
            <td>{{ blog.title }}</td>
            <td>published</td>
          </tr>
          
        </tbody>
      </table>
    </div>
    </div>
    `
})

export class ProfileBlogComponent{

  constructor(private service: BlogService, private loginService: LoginService){}

  user: User;
  blogs:Blog[] =[];
  username: string;

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
              this.service.getBlog()
                .subscribe(data=> data.map(blog => {
                  if(currentUser === blog.username){
                    this.blogs.push(blog);
                    console.log(this.blogs)
                  }
                }))
            }
          });
      });
      

  }
}