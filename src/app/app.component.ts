import { Component } from '@angular/core';
import { PageContentDoc } from './models/PageContentDoc.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketplace-cms-components';
  buyerSiteUrl = 'https://mgr-buyer-test.ordercloud-qa.com';
  editorOptions = {
    oc_product_url_parser: (p: any) => {
      return `${this.buyerSiteUrl}/product/${p.ID}/view`;
    },
    content_css:
      'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css'
  };
  // currentPage: Partial<PageContentDoc> = {
  //   Title: 'Test Page Title',
  //   Url: 'test-my-url',
  //   Content: '<h1>TEST CONTENT</h1>',
  //   NavigationTitle: 'Test Page',
  //   Description: 'Short 300 word description to be used in Meta tags',
  //   Active: true
  // };
}
