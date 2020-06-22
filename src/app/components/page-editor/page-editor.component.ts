import { Component, OnInit, Input } from '@angular/core';
import { kebab } from 'case';
import { PageContentDoc } from 'src/app/models/PageContentDoc.interface';

const EMPTY_PAGE_CONTENT_DOC: Partial<PageContentDoc> = {
  Title: '',
  Url: '',
  Description: '',
  HeaderEmbeds: '',
  Content: `<div class="card" data-oc-widget="product-display" data-oc-product-id="CP8201">
  <div class="card-body">
  <h5 class="card-title">ATUS CP8201 Impedance Transformer</h5>
  <p>ATUS provides an easy way to transform your Lo-Z Mic cable into a Hi-Z 1/4" input. &nbsp;Built from quality parts, this product is not only suitable for the studio, but live applications as well.</p>
  <a class="btn btn-primary" href="https://mgr-buyer-test.ordercloud-qa.com/product/CP8201/view">View Product</a></div>
  </div>`,
  FooterEmbeds: '',
  Active: false,
  NavigationTitle: ''
};

@Component({
  selector: 'cms-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  @Input() renderSiteUrl: string;
  @Input() editorOptions: any;
  @Input() pageContentDoc?: PageContentDoc;
  @Input() htmlEditorOnly?: boolean;

  page: Partial<PageContentDoc>;
  automaticUrl: boolean;
  pageNavigation: boolean;

  constructor() {}

  ngOnInit(): void {
    console.log(this.htmlEditorOnly);
    if (this.pageContentDoc) {
      this.page = this.pageContentDoc;
      this.automaticUrl =
        this.pageContentDoc.Url === kebab(this.pageContentDoc.Title);
      this.pageNavigation = Boolean(this.pageContentDoc.NavigationTitle);
    } else {
      this.page = EMPTY_PAGE_CONTENT_DOC;
      this.automaticUrl = true;
      this.pageNavigation = false;
    }
  }

  onPageTitleKeyUp(value: string) {
    if (this.automaticUrl) {
      this.page.Url = kebab(value);
    }
  }

  onAutomaticUrlChange() {
    if (this.automaticUrl && this.page.Title) {
      this.page.Url = kebab(this.page.Title);
    }
  }

  onPageNavigationChange() {
    if (this.pageNavigation && !this.page.NavigationTitle) {
      this.page.NavigationTitle = this.page.Title;
    }
  }

  onPageStatusChange() {
    this.page.Active = !this.page.Active;
  }
}
