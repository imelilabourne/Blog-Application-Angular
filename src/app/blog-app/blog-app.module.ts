import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostBlogComponent } from './containers/users/post-blog.component';
import { BaseComponent } from './containers/base.component';
import { BlogRoutingModule, routingComponents } from './blog-app-routing.module';
import { HomeBlogComponent } from './containers/users/home-blog.component';
import { AdminNavComponent } from './containers/admin/navbar/admin-nav.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePostComponent } from './containers/admin/manage-containers/manage-posts.component';
import { ManageUserComponent } from './containers/admin/manage-containers/manage-users.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { DraftService } from './services/draft.service'
@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent,
    PostBlogComponent,
    HomeBlogComponent,
    AdminNavComponent,
    ManagePostComponent,
    ManageUserComponent,

    routingComponents
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService, DraftService],
  exports:[
      BaseComponent,
  ]
})
export class BlogAppModule { }
