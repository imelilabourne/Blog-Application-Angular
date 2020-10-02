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

  <div class="openDraft">
    
    <p class="draft-sticky">Open Drafts<i class="fa fa-paint-brush"></i></p>
    
    <div class="card card-body">
      <div *ngFor="let draft of drafts">
        <div class="draft-container">
          <div class="title row draft-title">
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
    <div class="row" id="message"  *ngIf="showMsg">
        <div class="col-xs-12">
          <p class="alert alert-success">
              <strong>Blog Request Success!</strong> Please wait for approval.
              <button style="float: right; margin-top:-8px" class="btn btn-outline-danger" (click) ="closeMsg()">Close</button>

          </p>
        </div>
      </div>

      <div class="row" id="message"  *ngIf="showMsgDraft">
        <div class="col-xs-12">
          <p class="alert alert-success">
              <strong>Blog saved as Draft!</strong>
              <button style="float: right; margin-top:-8px" class="btn btn-outline-danger" (click) ="closeMsg()">Close</button>

          </p>
        </div>
      </div>


      <div class="panel panel-primary">
          <div class="panel-heading">
              <div class="panel-title">
                Compose Blog  <i class="fa fa-pencil"></i>
                <i style="font-size:24px; float:right" class="fa">&#xf103;</i>
              </div>
          </div>
          <div class="panel-body">
            <p>@{{ loggedInUser}}</p>
            <form [formGroup] ="postForm" (ngSubmit)="addBlog()">
              <div class="form-group">
                <input class="form-control" placeholder="Title" formControlName="title">
                <br>
                <textarea class="form-control content" formControlName="content"></textarea>
                <button type="submit" class="btn btn-primary btn-block">Add</button>
                <button type="button" (click)="addDrafts()" class="btn btn-outline-info btn-block">Save as Drafts</button>    
              </div>
            </form>
          </div>
      </div>

    <div class="blog-post panel panel-info">
      <div class="panel-heading">News feed</div>
      
      <div class="posts">
        <div *ngFor="let blog of blogs" class="post-container">
        <div>
                  <p class="title">{{blog.title}}</p>  
                </div>
          <div class="blog-post-inner row">
            
            <div *ngIf="blog.imageUrl" class="image-wrapper">
              <img class="img-fluid" alt="blog-photo" src="{{ blog?.imageUrl }}">
            </div>

            <div class="blog-text-inner">
           
               
                <div class="sub">
                  <span class="span">@{{ blog.username }}</span>
                  <span class="date"> {{ blog.date | date: 'short'}}</span>
                </div>
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

  showMsg: boolean = false;
  showMsgDraft: boolean = false;

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
      this.showMsg= true;


      this.postForm.get("title").patchValue('');
      this.postForm.get("content").patchValue('');
  }

  closeMsg(){
    this.showMsg = false;
    this.showMsgDraft = false;
  }
  addDrafts(){
    this.blogs.filter((item) => item);

    this.draftService.addDraft(this.postForm.value, {
      username: this.loggedInUser,
      date: this.date
    })
      .subscribe((data) => this.blogs = this.blogs.filter((item)=> item ));
      this.showMsgDraft= true;
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
