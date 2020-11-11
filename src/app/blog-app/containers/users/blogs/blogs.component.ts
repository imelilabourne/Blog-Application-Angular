import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog-app/services/blog.service';

@Component({
  selector: 'app-blogs',
  template: `
    <div class="containera">
    <app-compose-blog></app-compose-blog>
    <app-blog-item [blogs]="data"></app-blog-item>
    </div>
  `,
  styleUrls: ['blogs.component.css']
})
export class BlogsComponent implements OnInit {

  data;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(data => this.data = data);
  }

}
