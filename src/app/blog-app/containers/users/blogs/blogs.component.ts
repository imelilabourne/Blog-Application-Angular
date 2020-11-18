import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog-app/services/blog.service';
import { Blog } from '../../interfaces/composeBlog.interface';

@Component({
  selector: 'app-blogs',
  template: `
    <div class="containera">
      <app-compose-blog></app-compose-blog>
      <hr>
      <app-blog-item [blogs]="data"></app-blog-item>
    </div>
  `,
  styleUrls: ['blogs.component.css']
})
export class BlogsComponent implements OnInit {

  data: Blog[];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(data => this.data = data);
  }

}
