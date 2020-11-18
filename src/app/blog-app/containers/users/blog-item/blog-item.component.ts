import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../interfaces/composeBlog.interface';

@Component({
  selector: 'app-blog-item',
  template: `

    <div class="item-wrapper " *ngFor="let blog of blogs">
    <div *ngIf="blog.status  === 'Approved'">

      <h3>{{ blog.title }} <span class="username">@{{ blog.username }}</span><span class="date">{{ blog.date | date  :'short'}}</span></h3>
        <div class="interaction">
          <p>{{ blog.content }}</p>
          <a><i class="far fa-heart"></i></a>
        </div>
        <div class="blog-img-wrapper">
        <img *ngIf="blog.imageUrl" src="{{ blog.imageUrl }}">
        </div>
    </div>
    </div>
  `,
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {

  constructor() { }
  @Input() blogs: Blog[];

  ngOnInit() {
  }

}
