import { Component } from '@angular/core';
import { LoginService } from 'src/app/blog-app/services/login.service';
import { User } from '../../interfaces/auth-form.interface';

@Component({
    selector: 'manage-users',
    styleUrls: ['manage-posts.component.css'],
    template: `
    <div class="manage-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <th scope="row">{{user.id}}</th>
                <td>{{ user.firstname }} {{user.lastname}}</td>
                <td>{{ user.username }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    `
})

export class ManageUserComponent{

  users: User[];

  constructor(private loginService: LoginService){}

  ngOnInit(){
    this.loginService.getUsers()
      .subscribe(data => this.users = data);
  }
}