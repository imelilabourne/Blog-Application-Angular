import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../containers/interfaces/auth-form.interface';
import { map } from 'rxjs/operators';

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

    getUserDetails(){
        return this.http.get('http://localhost:3000/users').pipe(map(item => {
            const temp = [];

            temp.push(item);

            return temp;
        }))
    }

    getUsers(){
        return this.http.get('http://localhost:3000/users');
    }

    get isLoggedIn(){
        return this.loggedInStatus;
    }

}