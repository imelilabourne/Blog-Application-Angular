import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../containers/interfaces/auth-form.interface";


@Injectable()
export class LoginService{
    constructor(private http: HttpClient){}


    getAdmin():Observable<User>{
        return this.http.get<User>("http://localhost:3000/admin")
    }
    
    getUsers():Observable<User[]>{
        return this.http.get<User[]>("http://localhost:3000/users")
    }

    signUp(user: User):Observable<User>{
        return this.http.post<User>("http://localhost:3000/users", user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    
}