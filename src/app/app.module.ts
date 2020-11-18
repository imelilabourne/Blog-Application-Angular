import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlogAppModule } from './blog-app/blog-app.module'
import { LoginService } from './blog-app/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { EmojiPickerModule } from 'ng-emoji-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BlogAppModule,
    HttpClientModule,
    EmojiPickerModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
