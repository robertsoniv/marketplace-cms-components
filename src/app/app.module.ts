import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { ContentBlockComponent } from 'src/storybook/page/components/ContentBlock/ContentBlock.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ContentContainerComponent,
    ContentBlockComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
