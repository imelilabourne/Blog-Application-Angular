import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminBlogComponent } from './containers/admin/admin-blog.component';
import { ManageUserComponent } from './containers/admin/manage-containers/manage-users.component';
import { LoginComponent } from './containers/login/login.components';
import { NotFoundComponent } from './containers/not-found.component';
import { SignupBlogComponent } from './containers/signup/signup.component';
import { ProfileBlogComponent } from './containers/users/profile/profile-blog.compoenent';
import { UsersBlogComponent } from './containers/users/users-blog.component';

const routes: Routes = [
    {path: '', redirectTo:'/login', pathMatch:"full"},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupBlogComponent},
    {path: 'users', component: UsersBlogComponent},
    {path: 'profile', component: ProfileBlogComponent},
    {path: 'userslist', component: ManageUserComponent},
    {path: 'admin', component: AdminBlogComponent, canActivate: [AuthGuard]},
    {path: '**', component: NotFoundComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class BlogRoutingModule{}
export const routingComponents = [UsersBlogComponent, 
    AdminBlogComponent, 
    LoginComponent, 
    NotFoundComponent,
    SignupBlogComponent,
    ProfileBlogComponent
]