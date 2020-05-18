import { storiesOf } from '@storybook/angular';
import { PageComponent } from '../../app/components/page/page.component';
import { ContentContainerComponent } from '../../app/components/content-container/content-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { SimpleComponent } from './components/simple/simple.component';

storiesOf('PageComponent', module)
  .add('with two simple components', () => ({
    component: PageComponent,
    moduleMetadata: {
      declarations: [ContentContainerComponent, SimpleComponent],
      imports: [HttpClientModule],
      providers: [HttpClient, Meta, Title, Renderer2],
      entryComponents: [SimpleComponent]
    },
    props: {
      pageDoc: {
        "Url": "/page1",
        "Title": "FAQ",
        "Description": "Frequently Asked Questions",
        "MetaImageUrl": "https://www.superoffice.com/globalassets/blog/2016/10/how-to-build-faq-section.jpg",
        "DateLastUpdated": "2020-05-15T03:55:03.021Z",
        "Active": true,
        "ContentDocUrls": [
          "https://mock-cms-content.herokuapp.com/content-docs/simple1.json",
          "https://mock-cms-content.herokuapp.com/content-docs/simple2.json"
        ],
        "HeaderEmbeds": "console.log('hi from header')",
        "FooterEmbeds": "console.log('hi from footer')",
        "NavTitle": null
      }
    }
  }))
