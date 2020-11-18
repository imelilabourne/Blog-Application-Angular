import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rigthbar',
  styleUrls: ['rigthbar.component.css'],
  template: `
  <div class="">
    <div class="sidebar">
      <div class="flex search-div">
        <input class="search" placeholder="Search"/><i class="fa fa-search"></i>
      </div>  
        <div class="wrapper">
          <h4>
          Trending
          </h4>
          <p>Zoro</p>
          <p>#Lazada1111</p>
          <p>shawn mendes</p>
          <p>PS5</p>
          <p>The Juans</p>
        </div>
        <hr>
        <div class="wrapper">
          <h4>Who to Follow</h4>
          <div class="flex">
            <div><p>Huawei</p></div>
            <div><button class="btn-primary">Follow</button></div>
          </div>

          <div class="flex">
            <div><p>CDO</p></div>
            <div><button class="btn-primary">Follow</button></div>
          </div>

          <div class="flex">
            <div><p>Samsung</p></div>
            <div><button class="btn-primary">Follow</button></div>
          </div>
        </div>
    </div>
    </div>
  `,
})
export class RigthbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
