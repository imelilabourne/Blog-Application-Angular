import { Component } from '@angular/core';

@Component({
  selector: 'navbar-blog',
  styleUrls: ['navbar.component.css'],
  template:`
    <div>
        <nav>
            <div class="logo">Blg</div>
            <div class="links">
                <a routerLink="/users"><i class="fa fa-home"></i></a>
                <a routerLink="/profile"><i class="fa fa-user-circle"></i></a>
                <a><i class="fa fa-poll"></i></a>
            </div>
            <a routerLink="/login" (click)="removeUser()" class="logout">Logout</a>
        </nav>
    </div>`,
})
export class NavbarComponent {

    removeUser(){
        localStorage.clear()
    }
}
