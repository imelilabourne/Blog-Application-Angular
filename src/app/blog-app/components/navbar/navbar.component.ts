import { Component} from '@angular/core';

@Component({
  selector: 'navbar-blog',
  styleUrls: ['navbar.component.css'],
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
    user = localStorage.getItem('user');
    bool: boolean = false;

    removeUser(){
        localStorage.clear()
    }


    menubar(){
        this.bool = !this.bool;
    }
 
}
