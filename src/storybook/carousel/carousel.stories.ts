import { storiesOf } from '@storybook/angular';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselSlideComponent } from 'src/app/components/carousel-slide/carousel-slide.component';
import { CmsCarouselSlideConfig } from 'src/app/models/CmsCarousel.interface';

const BasicExampleSlides: CmsCarouselSlideConfig[] = [
  {
    text: {
      title: 'First Slide',
    },
    background: {
      image: {
        url: `https://picsum.photos/id/944/1700/500`,
        title: 'A metal bridge in the jungle',
      },
    },
  },
  {
    text: {
      title: 'Second Slide',
      subtitle: 'With a subtitle',
    },
    background: {
      image: {
        url: `https://picsum.photos/id/1011/1700/500`,
        title: 'Woman canoeing',
      },
    },
  },
  {
    text: {
      title: 'Third Slide',
      subtitle: 'Also has a subtitle!',
    },
    background: {
      image: {
        url: `https://picsum.photos/id/984/1700/500`,
        title: 'Grassy mountainscape',
      },
    },
  },
];

storiesOf('Carousel', module).add('Basic Example', () => ({
  component: CarouselComponent,
  moduleMetadata: {
    declarations: [CarouselSlideComponent],
    imports: [NgbCarouselModule],
    providers: [],
    entryComponents: [],
  },
  props: {
    slides: BasicExampleSlides,
  },
}));
