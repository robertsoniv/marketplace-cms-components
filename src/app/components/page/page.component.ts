import { Component, OnInit, Input, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { PageContentDoc } from '../../models/PageContentDoc.interface';

@Component({
  selector: 'cms-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  contentDocUrls: string[] = [];
  @Input() pageDoc: PageContentDoc;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) { }

  ngOnInit(): void {
    if (!this.shouldShowContent(this.pageDoc)) {
      this.contentDocUrls = [] as string[];
      // this is an extra check, but should be handled at a higher level ideally
      console.warn('Page can not be displayed. Please ensure:\n1. Page is active\n2. Page has content doc urls\n3. Page Url matches path of current url')
    }
    this.contentDocUrls = this.pageDoc.ContentDocUrls;
    this.setMetaData(this.pageDoc);
    this.loadScripts(this.pageDoc.HeaderEmbeds, this.pageDoc.FooterEmbeds);
  }

  private shouldShowContent(pageDoc: PageContentDoc): boolean {
    return Boolean(
      pageDoc &&
      pageDoc.Active &&
      pageDoc.ContentDocUrls &&
      pageDoc.ContentDocUrls.length && 
      pageDoc.Url === this.document.location.href
    )
  }

  private setMetaData(pageDoc: PageContentDoc) {
    // addTag results in dupes, so we use updateTag instead

    // normal metadata
    this.titleService.setTitle(pageDoc.Title);
    this.metaService.updateTag({ property: 'application-name', content: pageDoc.SiteUrl })
    this.metaService.updateTag({ property: 'description', content: pageDoc.Description })

    // open graph meta data
    this.metaService.updateTag({property: 'og:type', content: 'website'})
    this.metaService.updateTag({property: 'og:title', content: pageDoc.Title})
    this.metaService.updateTag({property: 'og:description', content: pageDoc.Description})
    this.metaService.updateTag({property: 'og:image', content: pageDoc.MetaImageUrl})

    // twitter metadata
    this.metaService.updateTag({ property: 'twitter:card', content: 'summary' })
    this.metaService.updateTag({ property: 'twitter:site', content: pageDoc.SiteUrl })
    this.metaService.updateTag({ property: 'twitter:title', content: pageDoc.Title })
    this.metaService.updateTag({ property: 'twitter:description', content: pageDoc.Description })
    this.metaService.updateTag({property: 'twitter:image', content: pageDoc.MetaImageUrl})
  }

  private loadScripts(headerEmbeds, footerEmbeds) {
    this.createScriptTag(headerEmbeds, 'head');
    this.createScriptTag(footerEmbeds, 'body');
  }

  private createScriptTag(content: string, appendTo: string): void {
    // create script
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.textContent = content;

    // append to target element
    const target = this.document.getElementsByTagName(appendTo)[0];
    this.renderer.appendChild(target, script);
  }
}
