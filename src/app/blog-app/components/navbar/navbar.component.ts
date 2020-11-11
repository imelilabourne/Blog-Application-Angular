import { Component } from '@angular/core';

@Component({
  selector: 'navbar-blog',
  styleUrls: ['navbar.component.css'],
  template:`
        <div class="sidebar">
            <div class="logo">Blg</div>
            <div><a routerLink="/users"><i class="fa fa-home"> Home</i></a></div>
            <div><a *ngIf="user !=='admin' " routerLink="/profile"><i class="fa fa-user-circle"> Profile</i></a></div>
            <a routerLink="/login" (click)="removeUser()" class="logout">Logout</a>
        </div>`,
})
export class NavbarComponent {

    user = localStorage.getItem('user');
    removeUser(){
        localStorage.clear()
    }
}
