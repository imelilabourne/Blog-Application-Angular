import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth:AuthService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // return this.auth.isLoggedIn;
     
      // if (!this.auth.isLoggedIn) {
      //   // redirect to some view explaining what happened
      //   this.router.navigateByUrl('/login');
      //   return false;
      // } else {
      //   return true;
      // }

      if(localStorage.getItem("user")  === "admin"){
        return true;
      }
      else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }
}
