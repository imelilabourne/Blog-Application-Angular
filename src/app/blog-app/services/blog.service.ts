import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Blog } from "../containers/interfaces/composeBlog.interface";
@Injectable({
    providedIn: 'root'
  })

export class BlogService{

    constructor(private http: HttpClient){}
    getBlogs():Observable<Blog[]>{
        return this.http.get<Blog[]>("http://localhost:3000/blogs")
    }

    addBlog(blog): Observable<Blog>{
        return this.http.post<Blog>("http://localhost:3000/blogs", blog ,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }
    
    // getPendingPost(): Observable<Blog[]>{
    //     return this.http.get<Blog[]>("http://localhost:3000/pending")
    // }

    // addPending(blog1, blog): Observable<Blog>{
    //     return this.http.post<Blog>("http://localhost:3000/pending", {...blog1 ,...blog}, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    // }

    removePending(id:number): Observable<Blog>{
        return this.http.delete<Blog>("http://localhost:3000/pending" + "/" + id);
    }
    
} 