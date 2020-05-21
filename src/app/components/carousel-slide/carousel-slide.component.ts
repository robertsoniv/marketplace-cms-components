import { Component, OnInit, Input } from '@angular/core';
import Color from 'color';
import {
  CmsBackground,
  CmsCarouselSlideTextConfig,
} from 'src/app/models/CmsCarousel.interface';

@Component({
  selector: 'cms-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.scss'],
})
export class CarouselSlideComponent implements OnInit {
  @Input() background?: CmsBackground;
  @Input() text?: CmsCarouselSlideTextConfig;
  backgroundColor?: string;

  constructor() {
    // if (this.background && this.background.color) {
    //   console.log('hit');
    //   try {
    //     const color = new Color(this.background.color);
    //     this.backgroundColor = color.hex();
    //     console.log('worked', this.backgroundColor);
    //   } catch (ex) {
    //     console.log('error', ex);
    //     throw ex;
    //   }
    // }
  }

  ngOnInit(): void {}
}
