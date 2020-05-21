import { Component, OnInit, Input } from '@angular/core';

interface CmsAsset {
  url: string;
  title: string;
}

interface CmsBackground {
  image?: CmsAsset;
  color?: string;
}

interface CmsCarouselSlideTextConfig {
  title?: string;
  text?: string;
}

interface CmsCourselSlideConfig {
  background?: CmsBackground;
  text?: CmsCarouselSlideTextConfig;
}

@Component({
  selector: 'cms-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() slides: CmsCourselSlideConfig;

  constructor() {}

  ngOnInit(): void {}
}
