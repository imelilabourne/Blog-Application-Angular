import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../containers/interfaces/auth-form.interface';

interface myData {
    success: boolean, 
    message: string
}

@Injectable()
export class AuthService{
    private loggedInStatus = false;
    constructor(private http: HttpClient){}

    setLoggegIn(value: boolean){
        this.loggedInStatus = value;
    }

    getAdminDetails(user: User){
        return this.http.post<myData>('http://localhost:3000/admin', user)
    }

    getUserDetails(user: User){
        return this.http.post<myData>('http://localhost:3000/users', user)
    }

    get isLoggedIn(){
        return this.loggedInStatus;
    }

}