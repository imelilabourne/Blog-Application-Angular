import { Component } from '@angular/core';
import { BlogService } from 'src/app/blog-app/services/blog.service';
import { DraftService } from 'src/app/blog-app/services/draft.service';
import { Blog } from '../../interfaces/composeBlog.interface';

@Component({
    selector: 'blog-draft',
    template: `
        <div class="container-fluid">

            <div *ngFor = "let draft of drafts" >
                <div class="row">
                    <div class="col-md-10">
                        <h5>{{ draft.title }}</h5>
                        <p>{{ draft.content }}</p>
                    </div>
                    <div class="col-md-2">
                        <button (click)="sendDraft(draft)" class="btn btn-secondary btn-block">Post</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class DraftComponent{

    drafts: Blog[];
    constructor(private draftService: DraftService
        , private blogService:BlogService){}

    ngOnInit(){
        this.draftService.getDrafts().subscribe(data => {
            this.drafts = data;
        })
    }

    sendDraft(draft){
        this.draftService.moveDraft({
            title: draft.title,
            content: draft.content,
            imageUrl: draft.imageUrl,
            username: draft.username,
            status: "forApproval",
            date: new Date(),
        }).subscribe(() => {
            this.draftService.deleteDraft(draft.id).subscribe();
        });

        
    }
}