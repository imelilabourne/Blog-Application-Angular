import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rigthbar',
  styleUrls: ['rigthbar.component.css'],
  template: `
    <div class="sidebar">
        <input class="form-group" placeholder="Search"/>
        <div class="wrapper">
          <h4>
          Trending
          </h4>
          <p>Zoro</p>
          <p>#Lazada1111</p>
        </div>
        <hr>
        <div class="wrapper">
          <h4>Who to Follow</h4>
          <div class="container-fluid flex evenly-flex">
            <p>Huawei</p>
            <button class="btn-primary">Follow</button>
          </div>
        </div>
    </div>
  `,
  styles: []
})
export class RigthbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
