import { Component } from '@angular/core';
import { PageContentDoc } from './models/PageContentDoc.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketplace-cms-components';
  currentPage: Partial<PageContentDoc> = {
    Title: 'Test Page Title',
    Url: 'test-my-url',
    Content: '<h1>TEST CONTENT</h1>',
    NavigationTitle: 'Test Page',
    Description: 'Short 300 word description to be used in Meta tags',
    Active: true
  };
}
