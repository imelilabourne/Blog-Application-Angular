import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../containers/interfaces/auth-form.interface';
import { Blog } from '../containers/interfaces/composeBlog.interface';
import { map } from "rxjs/operators"; 
@Injectable()
export class DraftService{

    constructor(private http: HttpClient){}

    getDrafts(): Observable<Blog[]>{
        return this.http.get<Blog[]>("http://localhost:3000/drafts");
    }

    addDraft(blog1, blog): Observable<Blog>{
        return this.http.post<Blog>("http://localhost:3000/drafts", {...blog1 ,...blog}, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    editDraft(draft: Blog): Observable<Blog[]>{
        return this.http
        .put("http://localhost:3000/drafts" + "/" + draft.id, draft)
        .pipe(map((res:any) => res));
    }

    deleteDraft(id: number):Observable<User>{
        return this.http.delete<User>("http://localhost:3000/drafts" + "/"+ id);
    }

    moveDraft(blog: Blog):Observable<Blog>{
        return this.http.post<Blog>("http://localhost:3000/pending", blog, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

}