import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog-app/services/blog.service';
import { LoginService } from 'src/app/blog-app/services/login.service';
import { User } from '../../interfaces/auth-form.interface';

@Component({
  selector: 'app-compose-blog',
  template: `
    <h2>Blog App</h2>
      <div class="compose">
        <div class="flex">
          <img *ngIf="imageUrl" [src]="imageUrl" class="userPic">
          <!--<textarea name="" id="" cols="70" rows="4" placeholder="What's Happenning?"></textarea>-->
          <div>
            <input placeholder="Title" class="form-control">
            <div class="text-area-wrapper">
            <emoji-input
              [(model)]="bindedVariable"
              [textArea]="{cols: 78, rows: 5}"
              [onEnter]="onEnterFunction"
              [popupAnchor]="'top'"
              (setPopupAction)="setPopupAction($event)">

            </emoji-input>
            </div>
            </div>
        </div>

        <div class="blog-post-wrapper">
            <img [src]="source" *ngIf="source" class="blogPic">
        </div>
        <div class="interactions">

        
          <i class="far fa-images"></i>
          <i class="fa fa-camera"></i>
          <button class="smile-btn" type="button" name="button"  style="display: inline-block;" (click)="openPopup()">
          <i class="fa fa-smile"></i>
          </button>
          <button (click)="composeBlog()" class="compose-button">Compose</button>
          <input style="display:inline" type="file" id="input" accept="image/*" (change)="updateSource($event)">
        </div>
      </div>
  `,
  styleUrls: ['./compose-blog.component.css']
})
export class ComposeBlogComponent implements OnInit {

  constructor(private loginService: LoginService, private blogService: BlogService){}

  user: User;
  selectedFile: File = null;
  username: string;
  imageUrl: string;
  source:string = '';
  bindedVariable;
  input: string;
  title: string;

  public openPopup: Function;

  setPopupAction(fn: any) {
      this.openPopup = fn;
  } 

  composeBlog(){
    this.blogService.addPending({
      title: "title",
      content: this.bindedVariable,
      imageUrl: "../../../assets/1.jpg",
      username: localStorage.getItem('user'),
      status: "forApproval",
      date: new Date(),
    }).subscribe(
      data => console.log(data)
    )

  }

  updateSource(event) {

    this.projectImage(event.target['files'][0]);
    }

    
    projectImage(file: File) {
        let reader = new FileReader();

        reader.onload = (e: any) => {

        this.source = e.target.result;
        this.selectedFile = <File>file;
      };

      reader.readAsDataURL(file);
  }

  submitPhoto(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name );
  }

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
                    if(users.imageUrl){
                      this.imageUrl = users.imageUrl;
                    }
                    else{
                      this.imageUrl = "../../../assets/dp.png"
                    }
            }
          });
      });
  }
}
