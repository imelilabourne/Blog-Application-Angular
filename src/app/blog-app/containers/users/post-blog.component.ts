import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { DraftService } from '../../services/draft.service';
import { LoginService } from '../../services/login.service';
import { Blog } from '../interfaces/composeBlog.interface';

@Component({
  selector: 'post-blog',
  styleUrls: ['post-blog.component.css'],
  template:`
  <div class="post-div"> 
  <div class="openDraft">
    <i class="fa fa-paint-brush"></i>
    <div class="card card-body">
      
        <div *ngFor="let draft of drafts">
            <div class="draft-container">
                
                <div class="title row">
                  <div class="col-md-9 col-sm-6"><div *ngIf="bool; else editingTask"><h2>{{ draft.title }}</h2></div>
                  <ng-template #editingTask><input (keyup.enter)="editFunc(draft)" class="editInput" placeholder="Enter new title" [value]="draft.title" ></ng-template>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <button class="btn btn-primary" (click)="movetoPending(draft)">Post</button>
                    <button class="btn btn-info" (click)="toggle()" >Edit</button>
                    <button class="btn btn-danger" (click)="removeDraft(draft)">Remove</button>
                  </div>
              </div>
            <div class="draft-content">{{ draft.content }}</div>
            </div>
        </div>   
    </div>
  </div>


  <br>
    <div class="container">
      <div class="panel panel-primary">
          <div class="panel-heading">
              <div class="panel-title">
                Compose Blog <i class="fa fa-pencil"></i>
              </div>
          </div>
          <div class="panel-body">
            <p>@{{ loggedInUser}}</p>
            <form [formGroup] ="postForm" (ngSubmit)="addBlog()">
              <div class="form-group">
                <input class="form-control" placeholder="Title" formControlName="title">
                <br>
                <textarea class="form-control content" formControlName="content"></textarea>
                <button type="submit" class="btn btn-info btn-block">Add</button>
                <button type="button" (click)="addDrafts()" class="btn btn-info btn-block">Save as Drafts</button>
                
              </div>
            </form>
          </div>
      </div>
      <div>
      <!-- <img [src]="srcs"> -->
      
    </div>
    <div class="blog-post panel panel-info">
    <div class="panel-heading">News feed</div>
      <div class="posts">
        <div *ngFor="let blog of blogs">

          <div class="blog-post-inner row">
            <div class="image-wrapper">
              <img class="img-fluid" alt="blog-photo" src="{{ blog?.imageUrl }}"/>
            </div>

            <div class="blog-text-inner">
              <h2 class="title">{{ blog.title }}</h2>
              <span class="date">Date posted: {{ blog.date | date: 'short'}}</span>
              <span class="span">@{{ blog.username }}</span>
              <p class="draft-container">{{ blog.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  ` 
  ,
//   styleUrls: ['./home-blog.component.css']
})
export class PostBlogComponent {
  showModal;
  blogs: Blog[] = [];
  drafts: Blog[] = [];
  title: FormControl;
  id: number;
  image: string;
  bool: boolean = true;
  newTitle: string;

  tempBlog: Blog;
  content: FormControl;
  date = Date.now();
  loggedInUser = localStorage.getItem("user");
  
  constructor(private fb: FormBuilder, 
    private service: LoginService, 
    private draftService: DraftService,
    private blogService: BlogService){
    this.blogService.getBlog()
      .subscribe(data => {
        this.blogs = data;
      });

      this.draftService.getDrafts()
      .subscribe(data => {
        this.drafts = data;
      })
  }
  postForm = this.fb.group({
    title: "",
    content: ""
  })

  
  ngOninit(){
    
  }

  toggle(){
    return this.bool = !this.bool;
  }

  editFunc(event: Blog){
    // this.title = Object.assign({}, this.title, draft.title);

    this.draftService.editDraft(event)
      .subscribe(data => this.drafts = this.drafts.map((draft) => {
        if(draft.title === event.title){
          draft.title = Object.assign({}, this.title, draft.title);
        }
        console.log(draft);

        return draft;
      }));
    
  }
  
  addBlog(){
    this.blogService.addPending(this.postForm.value, {
      username: this.loggedInUser,
      date: this.date
    })
      .subscribe(data => this.blogs.push(this.postForm.value));
  }

  addDrafts(){
    this.blogs.filter((item) => item);

    this.draftService.addDraft(this.postForm.value, {
      username: this.loggedInUser,
      date: this.date
    })
      .subscribe((data) => this.blogs = this.blogs.filter((item)=> item ));

      this.postForm.get("title").patchValue('');
      this.postForm.get("content").patchValue('');
  }

  removeDraft(draft){
    this.draftService.deleteDraft(draft.id)
      .subscribe(( data) => this.drafts = this.drafts.filter((item => item !== draft)))
  }


  movetoPending(draft){

      this.tempBlog = draft;
      console.log(this.tempBlog)

      this.draftService.moveDraft(draft)
        .subscribe(data => {
          this.removeDraft(draft);
        })

    
  }
}
