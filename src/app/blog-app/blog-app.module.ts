import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BaseComponent } from './containers/base.component';
import { BlogRoutingModule, routingComponents } from './blog-app-routing.module';
import { AdminNavComponent } from './containers/admin/navbar/admin-nav.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePostComponent } from './containers/admin/manage-containers/manage-posts.component';
import { ManageUserComponent } from './containers/admin/manage-containers/manage-users.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { DraftService } from './services/draft.service';
import { RigthbarComponent } from './components/rigthbar/rigthbar.component';
import { BlogsComponent } from './containers/users/blogs/blogs.component';
import { ComposeBlogComponent } from './containers/users/compose-blog/compose-blog.component';
import { BlogItemComponent } from './containers/users/blog-item/blog-item.component'
@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent,
    AdminNavComponent,
    ManagePostComponent,
    ManageUserComponent,
    routingComponents,
    RigthbarComponent,
    BlogsComponent,
    ComposeBlogComponent,
    BlogItemComponent
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
