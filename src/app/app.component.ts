import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselEditorComponent } from './components/carousel-editor/carousel-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {

  }
  title = 'marketplace-cms-components';
  buyerSiteUrl = 'https://mgr-buyer-test.ordercloud-qa.com';
  editorOptions = {
    ordercloud: {
      marketplaceUrl: 'https://marketplace-middleware-test.azurewebsites.net',
      access_token: 'INSERT_ACCESS_TOKEN_HERE'
    },
    content_css:
      ['https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css']
  };

  openModal() {
    const modalRef = this.modalService.open(CarouselEditorComponent, {size: 'xl'});
    // modalRef.componentInstance.onSuccess = callback;
    // modalRef.componentInstance.fileMeta = meta;
  }
}
