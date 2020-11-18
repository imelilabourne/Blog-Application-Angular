import { Component } from "@angular/core";
import { BlogService } from "../../../services/blog.service";
import { LoginService } from "../../../services/login.service";
import { User } from "../../interfaces/auth-form.interface";
import { Blog } from "../../interfaces/composeBlog.interface";

@Component({
    selector: 'profile-blog',
    styleUrls: ['profile-blog.component.css'],
    template: `

    <div class="flex">

      <navbar-blog></navbar-blog>

 
      <div class="container">
        <div *ngIf="modal" class="modals ">
            <blog-draft ></blog-draft>
        </div>
          <div class="top row bg">
              <div class="col">
                  <img alt="display-photo"  *ngIf="imageUrl" [src]="imageUrl">
                  <!-- <h2>elilypad</h2> -->
              </div>
              <div class="col">
                  <h3>{{ user?.firstname }} {{ user?.lastname }}</h3>
                  <p> @{{user?.username }}</p>
                  <p>{{ user?.email }}</p>
              </div>

              <div class="col">
                <button (click)="toggle()" class="btn btn-secondary">Drafts</button>
              </div>

          </div>
          <div class="row bottom">
  
  <div class="status">
    <table class="table table-striped">
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
          <td>{{ blog.status }}</td>
        </tr>
        
      </tbody>
    </table>
  </div>
  </div>

    </div>
    </div>
    
    `
})

export class ProfileBlogComponent{

  constructor(private service: BlogService, private loginService: LoginService){}

  user: User;
  blogs:Blog[] =[];
  username: string;
  modal: boolean = false;
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
              this.service.getBlogs()
                .subscribe(data=> data.map(blog => {
                  if(currentUser === blog.username){
                    this.blogs.push(blog);
                    if(users.imageUrl){
                      this.imageUrl = users.imageUrl;
                    }
                    else{
                      this.imageUrl = "../../../assets/dp.png"
                    }
                  }
                }))

              this.service.getPendingPost().subscribe(data => {
                  data.map(item => {
                    if(currentUser === item.username){
                    this.blogs.push(item)
                    }
                  })
              })
            }

            
          });
      });



  }


  toggle(){
    this.modal = !this.modal;
  }
  
}