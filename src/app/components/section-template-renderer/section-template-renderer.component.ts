import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cms-section-template-renderer',
  templateUrl: './section-template-renderer.component.html',
  styleUrls: ['./section-template-renderer.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SectionTemplateRendererComponent {
  @Input() html: string;
  @Input() selected: boolean;
  constructor() {}
}
