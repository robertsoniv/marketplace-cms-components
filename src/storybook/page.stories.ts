import { PageComponent } from '../app/components/page/page.component';
import { ContentContainerComponent } from '../app/components/content-container/content-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { ContentBlockComponent } from '../app/components/content-block/content-block.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { moduleMetadata } from '@storybook/angular';
import { PageContentDoc } from 'src/app/models/PageContentDoc.interface';

export default {
  title: 'Page',
  component: PageComponent,
  parameters: {
    component: PageComponent
  },
  decorators: [
    moduleMetadata({
      declarations: [
        ContentContainerComponent,
        ContentBlockComponent,
        SafeHtmlPipe
      ],
      imports: [HttpClientModule],
      providers: [HttpClient, Meta, Title, Renderer2],
      entryComponents: [ContentBlockComponent]
    })
  ]
}

const BasicExamplePage: PageContentDoc = {
  ComponentName: 'PageComponent',
  SiteUrl: 'https://music-resell-store.com',
  Url: '/page1',
  Title: 'FAQ',
  Description: 'Frequently Asked Questions | Play It Again Sports',
  MetaImageUrl: 'https://www.superoffice.com/globalassets/blog/2016/10/how-to-build-faq-section.jpg',
  DateLastUpdated: '2020-05-15T03:55:03.021Z',
  Active: true,
  Content: [
    {
      'ComponentName': 'ContentBlockComponent',
      'TextArea': `<p style='max-width: 500px; margin: 20px'>
        This component is responsible for the things you can't see such as metadata and title
        which are important for SEO. </p>
        
        <p style='max-width: 500px; margin: 20px'>
        You can right click to inspect the html and see the properties 
        are set correctly. Its easier if you click 'Open canvas in a new tab' (top right)</p>
      `,
    },
  ],
  HeaderEmbeds: '',
  FooterEmbeds: '',
  NavTitle: null
}

export const BasicExample = () => ({
  component: PageComponent,
  props: {
    content: BasicExamplePage
  },
});