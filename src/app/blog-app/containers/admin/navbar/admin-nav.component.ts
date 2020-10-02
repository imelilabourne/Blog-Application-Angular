import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-nav',
    styleUrls: [`admin-nav.component.css`],
    template: `
    <nav> 
        <h3>TERA</h3>
        <div>
            <h3>ADMIN</h3>
        </div>
    </nav>
    <!-- <div class="icon-wrapper">
            <img src="../../../../assets/admin-icon.jpg">    
        </div> -->
        
    <div id="sidebar">
        <div class="icon-wrapper">
            <img src="../../../../assets/admin-icon.jpg">    
        </div>
        <ul>
            <li>
                Manage Post
            </li>
        </ul><ul>
            <li>
                Manage Users
            </li>
        </ul><ul>
            <li>
                Manage Topics
            </li>
        </ul>
        
    </div>
    
    `
})

export class AdminNavComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

  
}