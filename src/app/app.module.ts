import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { ContentBlockComponent } from 'src/app/components/content-block/content-block.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BgColorDirective } from './directives/bg-color.directive';
import { RowComponent } from './components/row/row.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ContentContainerComponent,
    ContentBlockComponent,
    CarouselComponent,
    BgColorDirective,
    RowComponent,
    SafeHtmlPipe
  ],
  imports: [BrowserModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
