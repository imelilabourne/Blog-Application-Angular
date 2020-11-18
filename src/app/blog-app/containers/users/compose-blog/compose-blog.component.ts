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

          <emoji-input
            [(model)]="bindedVariable"
            [textArea]="{cols: 70, rows: 5}"
            [onEnter]="onEnterFunction"
            [popupAnchor]="'top'"
            (setPopupAction)="setPopupAction($event)">
          </emoji-input>
        </div>
  <!--
        <button type="button" name="button"  style="display: inline-block;" (click)="openPopup()">
        Insert Emoji
        </button>
-->
        <div class="blog-post-wrapper">
            <img [src]="source" *ngIf="source" class="blogPic">
        </div>
        <div>
        <label class="label" for="input">Please upload a picture !</label>

        <input type="file" id="input" accept="image/*" (change)="updateSource($event)">
          <i class="far fa-images"></i>
          <i class="fa fa-camera"></i>
          
          <button type="button" name="button"  style="display: inline-block;" (click)="openPopup()">
          <i class="fa fa-smile"></i>
          </button>
          <button class="compose-button">Compose</button>
        </div>
      </div>
  `,
  styleUrls: ['./compose-blog.component.css']
})
export class ComposeBlogComponent implements OnInit {

  constructor(private loginService: LoginService){}

  user: User;
  selectedFile: File = null;
  username: string;
  imageUrl: string;
  source:string = '';
  

  public openPopup: Function;

    setPopupAction(fn: any) {
        this.openPopup = fn;
    } 
  
  updateSource(event) {

    this.projectImage(event.target['files'][0]);
    }

    
    projectImage(file: File) {
        let reader = new FileReader();

        reader.onload = (e: any) => {

        this.source = e.target.result;
        this.selectedFile = <File>event;
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
