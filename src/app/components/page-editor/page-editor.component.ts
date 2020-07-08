import { Component, OnInit, Input } from '@angular/core';
import { kebab } from 'case';
import { PageContentDoc } from 'src/app/models/PageContentDoc.interface';

const EMPTY_PAGE_CONTENT_DOC: Partial<PageContentDoc> = {
  Title: '',
  Url: '',
  Description: '',
  HeaderEmbeds: '',
  Content: `<div data-oc-widget="oc-section">
  <div class="jumbotron border-0">
  <div class="container text-center">
  <h1>Lorem ipsum dolor</h1>
  <p>Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>
  <a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>
  </div>
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
