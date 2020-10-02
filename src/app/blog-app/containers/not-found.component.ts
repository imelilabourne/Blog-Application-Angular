import { Component } from '@angular/core';

@Component({
    selector: 'not-found',
    styleUrls: ['not-found.component.css'],
    template: `
    <div class="container">
        <div>
            <img src="../../assets/404.png">
        </div>
        <h1>Oops!</h1>
        <h2>This page is lost</h2>
        <div>
            <a routerLink="/users">go back home</a>
        </div>
    </div>
    `
})

export class NotFoundComponent{}