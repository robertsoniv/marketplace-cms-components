import { storiesOf } from '@storybook/angular';
import { PageComponent } from '../../app/components/page/page.component';
import { ContentContainerComponent } from '../../app/components/content-container/content-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { ContentBlockComponent } from './components/ContentBlock/ContentBlock.component';
import { RowComponent } from './components/row/row.component';

storiesOf('PageComponent', module)
  .add('Simple Content Block Component', () => ({
    component: PageComponent,
    moduleMetadata: {
      declarations: [ContentContainerComponent, ContentBlockComponent],
      imports: [HttpClientModule],
      providers: [HttpClient, Meta, Title, Renderer2],
      entryComponents: [ContentBlockComponent]
    },
    props: {
      pageDoc: {
        "Url": "/page1",
        "Title": "FAQ",
        "Description": "Frequently Asked Questions | Play It Again Sports",
        "MetaImageUrl": "https://www.superoffice.com/globalassets/blog/2016/10/how-to-build-faq-section.jpg",
        "DateLastUpdated": "2020-05-15T03:55:03.021Z",
        "Active": true,
        // "ContentDocUrls": [
        //   "https://mock-cms-content.herokuapp.com/content-docs/simple1.json",
        //   "https://mock-cms-content.herokuapp.com/content-docs/simple2.json"
        // ],
        "Content": [
          {
            "ComponentName": "ContentBlockComponent",
            "Background": {
              "ImageUrl": null,
              "Color": "#BBF0BF"
            },
            "DateRange": {
              "StartDate": "",
              "EndDate": ""
            },
            "HorizontalAlignment": "Center",
            "VerticalAlignment": "Middle",
            "TextArea": "<h2>Where do you get your used equipment?</h2><p>We depend on customers like you for all our quality used gear! Bring in the gear you no longer use and we’ll pay you on the spot. We then offer it to someone else who can use it…at a great value. </br> Reuse. Recycle. Replay.®</p><h2>What type of sports gear do you buy?</h2><p>We buy a wide variety of quality used sports and fitness gear. If a sport is played in our community and we have room for it, we buy it. Play It Again Sports stores do not buy or sell firearms of any sort.</p>",
          },
        ],
        "HeaderEmbeds": "console.log('hi from header')",
        "FooterEmbeds": "console.log('hi from footer')",
        "NavTitle": null
      },
    }
  }))
  .add('Row Component', () => ({
    component: PageComponent,
    moduleMetadata: {
      declarations: [ContentContainerComponent, RowComponent],
      imports: [HttpClientModule],
      providers: [HttpClient, Meta, Title, Renderer2],
      entryComponents: [RowComponent]
    },
    props: {
      pageDoc: {
        "Url": "/page1",
        "Title": "What We Buy",
        "Description": "What we are currently purchasing",
        "MetaImageUrl": "https://www.superoffice.com/globalassets/blog/2016/10/how-to-build-faq-section.jpg",
        "DateLastUpdated": "2020-05-15T03:55:03.021Z",
        "Active": true,
        "Content": [
            // {
            //   "ComponentName": "CarouselComponent",
            //   "Slides": [
            //       {
            //           "ImageUrl": "https://usercontent2.hubstatic.com/13863111_f520.jpg",
            //           "BackgroundColor": "red",
            //           "Title": "Example Title",
            //           "Subtitle": "Example Subtitle"
            //       }
            //   ]
            // },
            {
              "ComponentName": "RowComponent",
              "Content": [
                {
                  "ComponentName": "ContentBlockComponent",
                  "Background": {
                    "ImageUrl": null,
                    "Color": "#B0AFF0"
                  },
                  "DateRange": {
                    "StartDate": "",
                    "EndDate": ""
                  },
                  "HorizontalAlignment": "Center",
                  "VerticalAlignment": "Middle",
                  "TextArea": "<h2>Product 1</h2><p>a golf club</p><h2>Product 2</h2><p>a basketball</p>",
                },
                {
                  "ComponentName": "ContentBlockComponent",
                  "Background": {
                    "ImageUrl": null,
                    "Color": "#E8D0C6"
                  },
                  "DateRange": {
                    "StartDate": "",
                    "EndDate": ""
                  },
                  "HorizontalAlignment": "Center",
                  "VerticalAlignment": "Middle",
                  "TextArea": "<h2>Product 3</h2><p>Snowboard</p><h2>Product 4</h2><p>Hobby horse</p>",
                }
              ]
            }
        ],
        "HeaderEmbeds": null,
        "FooterEmbeds": null,
        "NavTitle": null
    }
    }
  }))
