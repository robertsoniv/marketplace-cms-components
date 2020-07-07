import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}
  title = 'marketplace-cms-components';
  buyerSiteUrl = 'https://mgr-buyer-test.ordercloud-qa.com';
  editorOptions = {
    ordercloud: {
      marketplaceUrl: 'https://marketplace-middleware-test.azurewebsites.net',
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJhbm9uLXRlbXBsYXRlLXVzZXIiLCJjaWQiOiJlOTU1ZDZlYy01OWM4LTQ0NDItOTQ4ZS0xNmNjYzVmZDI3YWUiLCJvcmRlcmlkIjoiZi1KNFdTUmk3VTZBMWVTYVRyblg3USIsInUiOiIxMDIwMjMwIiwidXNydHlwZSI6ImJ1eWVyIiwicm9sZSI6WyJNZUFkZHJlc3NBZG1pbiIsIk1lQWRtaW4iLCJNZUNyZWRpdENhcmRBZG1pbiIsIk1lWHBBZG1pbiIsIlNob3BwZXIiLCJTdXBwbGllclJlYWRlciIsIlN1cHBsaWVyQWRkcmVzc1JlYWRlciIsIlBhc3N3b3JkUmVzZXQiLCJCdXllclJlYWRlciJdLCJpc3MiOiJodHRwczovL2F1dGgub3JkZXJjbG91ZC5pbyIsImF1ZCI6Imh0dHBzOi8vYXBpLm9yZGVyY2xvdWQuaW8iLCJleHAiOjE1OTQwNjEyNjcsIm5iZiI6MTU5MzQ1NjQ2N30.wrM1n8GJvLmSOMkJV8ZsvK3CBGE_b6AdntVHSMCyM1o'
    },
    content_css: [
      'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
      // 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css'
    ]
  };
}
