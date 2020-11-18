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

    addBlog(blog: Blog): Observable<Blog>{
        return this.http.post<Blog>("http://localhost:3000/blogs", blog ,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    addPending(blog: Blog): Observable<Blog>{
        return this.http.post<Blog>("http://localhost:3000/pending", blog ,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }
    
    getPendingPost(): Observable<Blog[]>{
        return this.http.get<Blog[]>("http://localhost:3000/pending")
    }

    removePending(id:number){
        return this.http.delete("http://localhost:3000/pending" + "/" + id);
    }
    
} 