import { Component } from '@angular/core';
import { BlogService } from 'src/app/blog-app/services/blog.service';
import { LoginService } from 'src/app/blog-app/services/login.service';
import { Blog } from '../../interfaces/composeBlog.interface';

@Component({
    selector: 'manage-posts',
    styleUrls: ['manage-posts.component.css'],
    template: `
    <div class="manage-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Author</th>
                <th scope="col">Date Posted</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let blog of blogs; let i = index"  >
                <th scope="row">{{ i + 1 }}</th> 
                <td class="col-md-2">{{ blog.title }}</td>
                <td class="col-md-4">{{ blog.content }}</td>
                <th class="col-md-2">{{ blog.username }}</th>
                <th class="col-md-2">{{ blog.date |date: 'short' }}</th>

                <td class="col-md-2">
                  <button type="button" class="btn btn-info" (click)="approvedPost(blog)"  data-toggle="modal" data-target="#modal">
                    Approve
                  </button>
                  <button type="button" class="btn btn-danger"  (click)="showModaldeny=true; deniedClasss(blog)">
                    Deny
                  </button>
                </td>
            </tbody>
          </table>
        </div>

        
    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="modal" [ngClass]="{'show': showModal}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="showModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to publish?</p>  
          </div>
          <div class="modal-footer">
            <button (click)="approvedPost()" class="btn btn-warning">Yes</button>
            <button class="btn btn-danger" (click)="showModal = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="modaldeny" [ngClass]="{'show': showModaldeny}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="showModaldeny = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to deny?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-warning" (click) ="deniedPost()">Yes</button>
            <button class="btn btn-danger" (click)="showModaldeny = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    `
})

export class ManagePostComponent{
  blogs: Blog[] = [];
  id: number;
  showModal: boolean = false;
  showModaldeny: boolean = false;

  // deniedClass: boolean = false;

  constructor( private blogService: BlogService){}

  user = localStorage.getItem('user');
  
  status: boolean = false;
  ngOnInit(){
  }

  approvedPost(blog){
    this.blogs = this.blogs.filter(item => blog !== item)

    this.blogService.addBlog(blog)
      .subscribe(data => {
        this.blogService.removePending(blog.id)
          .subscribe(data => console.log(data));
      });

  }

  deniedPost(){
    alert("Post Request Deniied")
  }

  deniedClasss(blog){
    
  }
}