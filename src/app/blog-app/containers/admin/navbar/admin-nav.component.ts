import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-nav',
    styleUrls: [`admin-nav.component.css`],
    template: `
    <nav> 
        <h3>ADMIN</h3>
        <div class="link-div">
            <div class="link"><a routerLink="/users">Go to home</a></div>
            <div class="link"><a routerLink="/login" (click)="removeUser()" class="logout">Logout</a></div>
        </div>
    </nav>
    <!-- <div class="icon-wrapper">
            <img src="../../../../assets/admin-icon.jpg">    
        </div> -->
        
    
    `
})

export class AdminNavComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    removeUser(){
        localStorage.clear()
    }

  
}