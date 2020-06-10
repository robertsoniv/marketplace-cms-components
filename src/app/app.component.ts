import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketplace-cms-components';
  editorOptions = {
    content_css: 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
  }
}